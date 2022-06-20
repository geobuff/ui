import React, { useEffect, useState, FC } from "react";
import { useRouter } from "next/router";

import axiosClient from "../../axios/axiosClient";

import RegisterForm from "../../components/RegisterForm";
import { RegisterFormSubmit } from "../../types/register-form-submit";
import { GameOverRedirect } from "../../types/game-over-redirect";
import { signIn, useSession } from "next-auth/react";

const RegisterContainer: FC = () => {
  const router = useRouter();
  const { status } = useSession();

  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!router.query.data && status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  // Clear error after 5 seconds to clear banner
  useEffect(() => {
    setTimeout(() => {
      if (error) {
        setError(null);
      }
    }, 7500);
  }, [error]);

  const handleSubmit = (values: RegisterFormSubmit): void => {
    setIsSubmitting(true);
    setError(null);

    const payload = {
      avatarId: parseInt(values.avatarId),
      username: values.username,
      email: values.email,
      countryCode: values.countryCode,
      password: values.password.replace(/\s/g, ""),
    };

    axiosClient
      .post("/auth/register", payload)
      .then(async () => {
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
    <RegisterForm
      error={error}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    />
  );
};

export default RegisterContainer;
