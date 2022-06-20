import React, { useEffect, useState, FC } from "react";
import { useRouter } from "next/router";

import axiosClient from "../../axios/axiosClient";

import ResetPasswordForm from "../../components/ResetPasswordForm";
import { ResetPasswordFormReset } from "../../types/reset-password-form-submit";
import { useSession } from "next-auth/react";

const ResetPasswordContainer: FC = () => {
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
    <ResetPasswordForm
      error={error}
      isSuccess={isSuccess}
      isLoading={isLoading || status === "loading"}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
    />
  );
};

export default ResetPasswordContainer;
