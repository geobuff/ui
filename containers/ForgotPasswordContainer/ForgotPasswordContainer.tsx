import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState, FC, useEffect } from "react";

import axiosClient from "../../axios/axiosClient";

import ForgotPasswordForm from "../../components/ForgotPasswordForm";
import { ForgotPasswordFormSubmit } from "../../types/forgot-password-form-submit";

const ForgotPasswordContainer: FC = () => {
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
    <ForgotPasswordForm
      error={error}
      isSuccess={isSuccess}
      isLoading={status === "loading"}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
    />
  );
};

export default ForgotPasswordContainer;
