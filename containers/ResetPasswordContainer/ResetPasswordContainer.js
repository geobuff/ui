import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import axiosClient from "../../axios/axiosClient";
import useCurrentUser from "../../hooks/UseCurrentUser";

import ResetPasswordForm from "../../components/ResetPasswordForm";

const ResetPasswordContainer = () => {
  const router = useRouter();
  const { userId, token } = router.query;

  const { user, isLoading: isLoadingUser } = useCurrentUser();

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

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
    setError(null);
    axiosClient
      .put("/auth", {
        userId: parseInt(userId),
        token,
        password,
      })
      .then(() => {
        setIsSuccess(true);
      })
      .catch((error) => {
        setError(error.response.data);
      });
  };

  if (isLoading || isLoadingUser || user) {
    return null;
  }

  return (
    <ResetPasswordForm
      error={error}
      isSuccess={isSuccess}
      onSubmit={handleSubmit}
    />
  );
};

ResetPasswordContainer.propTypes = {};
ResetPasswordContainer.defaultProps = {};

export default ResetPasswordContainer;
