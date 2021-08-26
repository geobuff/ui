import React, { useEffect, useState, FC } from "react";
import { useRouter } from "next/router";

import axiosClient from "../../axios/axiosClient";
import useCurrentUser from "../../hooks/UseCurrentUser";

import ForgotPasswordForm from "../../components/ForgotPasswordForm";
import { ForgotPasswordFormSubmit } from "../../types/forgot-password-form-submit";

const ForgotPasswordContainer: FC = () => {
  const router = useRouter();
  const { user, isLoading: isLoadingUser } = useCurrentUser();

  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoadingUser && user) {
      router.push("/");
    }
  }, [isLoadingUser, user, router]);

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
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
    />
  );
};

export default ForgotPasswordContainer;
