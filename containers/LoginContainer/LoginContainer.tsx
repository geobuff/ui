import React, { useState, FC } from "react";
import { useRouter } from "next/router";
import LoginForm from "../../components/LoginForm";
import { LoginFormSubmit } from "../../types/login-form-submit";
import { GameOverRedirect } from "../../types/game-over-redirect";
import { signIn } from "next-auth/react";

const LoginContainer: FC = () => {
  const router = useRouter();

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

    if (router.query.data) {
      const data: GameOverRedirect = JSON.parse(router.query.data as string);

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

    setIsSubmitting(false);
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
