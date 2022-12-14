import React, { FC, useContext, useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";

import { LanguageContext } from "../context/LanguageContext/LanguageContext";

import axiosClient from "../axios/axiosClient";
import { ForgotPasswordFormSubmit } from "../types/forgot-password-form-submit";
import { ForgotPasswordFormContainer } from "./ForgotPasswordFormContainer";

export const ForgotPasswordContainer: FC = () => {
  const { t } = useContext(LanguageContext);

  const router = useRouter();
  const { status } = useSession();

  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  const handleSubmit = (values: ForgotPasswordFormSubmit): void => {
    setIsSubmitting(true);
    setError(null);
    axiosClient
      .post("/auth/send-reset-token", { email: values.email })
      .then(() => {
        setIsSuccess(true);
      })
      .catch((error) => setError(error.response.data))
      .finally(() => setIsSubmitting(false));
  };

  return (
    <>
      <Head>
        <title>{`${t.forgotPassword.title}- GeoBuff`}</title>
        <meta
          name="description"
          content="Forgot your password? Not to worry, we've got you covered. Get a reset link sent to your email and we'll have you back in action in no time."
        />
      </Head>
      <ForgotPasswordFormContainer
        error={error}
        isSuccess={isSuccess}
        isLoading={status === "loading"}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
      />
    </>
  );
};
