import React, { FC, useContext, useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";

import { LanguageContext } from "../contexts/LanguageContext";

import axiosClient from "../axios/axiosClient";
import { ResetPasswordFormReset } from "../types/reset-password-form-submit";
import { ResetPasswordFormContainer } from "./ResetPasswordFormContainer";

export const ResetPasswordContainer: FC = () => {
  const { t } = useContext(LanguageContext);

  const router = useRouter();
  const { userId, token } = router.query;
  const { status } = useSession();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
    if (userId && token) {
      axiosClient
        .get(`/auth/reset-token-valid/${userId}/${token}`)
        .then((response) => {
          if (!response.data) {
            setError(
              "Invalid reset token. Please request another token and try again."
            );
          }
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error.response.data);
          setIsLoading(false);
        });
    }
  }, [token, userId]);

  const handleSubmit = (values: ResetPasswordFormReset): void => {
    setIsSubmitting(true);
    setError(null);
    axiosClient
      .put("/auth", {
        userId: parseInt(userId as string),
        token,
        password: values.password,
      })
      .then(() => {
        setIsSuccess(true);
      })
      .catch((error) => setError(error.response.data))
      .finally(() => setIsSubmitting(false));
  };

  return (
    <>
      <Head>
        <title>{`${t.global.resetPassword} - GeoBuff`}</title>
        <meta
          name="description"
          content="Forgot your password? Not to worry, we've got you covered. Get a reset link sent to your email and we'll have you back in action in no time."
        />
      </Head>
      <ResetPasswordFormContainer
        error={error}
        isSuccess={isSuccess}
        isLoading={isLoading || status === "loading"}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
      />
    </>
  );
};
