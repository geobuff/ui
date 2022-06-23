import React, { useState, FC, useContext } from "react";
import { useRouter } from "next/router";
import LoginForm from "../../components/LoginForm";
import { LoginFormSubmit } from "../../types/login-form-submit";
import { GameOverRedirect } from "../../types/game-over-redirect";
import { signIn } from "next-auth/react";
import { CurrentUserContext } from "../../context/CurrentUserContext/CurrentUserContext";
import axiosClient from "../../axios";

const LoginContainer: FC = () => {
  const router = useRouter();
  const { updateUser } = useContext(CurrentUserContext);

  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: LoginFormSubmit): Promise<void> => {
    setIsSubmitting(true);
    setError(null);

    const response = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: `${window.location.origin}`,
    });

    if (response?.error) {
      setError(response.error);
      setIsSubmitting(false);
      return;
    }

    axiosClient
      .get(`/users/email/${values.email}`)
      .then((response) => {
        updateUser(response.data);
        if (router.query.data) {
          const data: GameOverRedirect = JSON.parse(
            router.query.data as string
          );

          router.push({
            pathname: data.redirect,
            query: {
              data: JSON.stringify({
                tempScoreId: data.tempScoreId,
              }),
            },
          });
        } else {
          router.push("/");
        }
      })
      .catch((error) => setError(error.response.data))
      .finally(() => setIsSubmitting(false));
  };

  return (
    <LoginForm
      error={error}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    />
  );
};

export default LoginContainer;
