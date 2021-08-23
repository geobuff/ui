import React, { useEffect, useState, FC } from "react";
import { useRouter } from "next/router";

import axiosClient from "../../axios/axiosClient";
import useCurrentUser from "../../hooks/UseCurrentUser";

import ResetPasswordForm from "../../components/ResetPasswordForm";

const ResetPasswordContainer: FC = () => {
  const router = useRouter();
  const { userId, token } = router.query;

  const { user, isLoading: isLoadingUser } = useCurrentUser();

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoadingUser && user) {
      router.push("/");
    }
  }, [user, isLoadingUser, router]);

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

  const handleSubmit = ({ password }) => {
    setIsSubmitting(true);
    setError(null);
    axiosClient
      .put("/auth", {
        userId: parseInt(userId[0]),
        token,
        password,
      })
      .then(() => {
        setIsSuccess(true);
      })
      .catch((error) => setError(error.response.data))
      .finally(() => setIsSubmitting(false));
  };

  if (isLoading || isLoadingUser || user) {
    return null;
  }

  return (
    <ResetPasswordForm
      error={error}
      isSuccess={isSuccess}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
    />
  );
};

export default ResetPasswordContainer;
