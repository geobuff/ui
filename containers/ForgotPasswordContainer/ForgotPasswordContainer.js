import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import axiosClient from "../../axios/axiosClient";
import useCurrentUser from "../../hooks/UseCurrentUser";

import ForgotPasswordForm from "../../components/ForgotPasswordForm";

const ForgotPasswordContainer = () => {
  const router = useRouter();
  const { user, isLoading: isLoadingUser } = useCurrentUser();

  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isLoadingUser && user) {
      router.push("/");
    }
  }, [isLoadingUser, user, router]);

  const handleSubmit = ({ email }) => {
    setError(null);
    axiosClient
      .post("/auth/send-reset-token", { email })
      .then(() => {
        setIsSuccess(true);
      })
      .catch((error) => {
        setError(error.response.data);
      });
  };

  return (
    <ForgotPasswordForm
      error={error}
      isSuccess={isSuccess}
      onSubmit={handleSubmit}
    />
  );
};

ForgotPasswordContainer.propTypes = {};
ForgotPasswordContainer.defaultProps = {};

export default ForgotPasswordContainer;
