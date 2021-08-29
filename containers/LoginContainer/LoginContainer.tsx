import React, { useEffect, useState, FC } from "react";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";

import axiosClient from "../../axios/axiosClient";
import useCurrentUser from "../../hooks/UseCurrentUser";

import LoginForm from "../../components/LoginForm";
import { DecodedToken } from "../../types/decoded-token";
import { LoginFormSubmit } from "../../types/login-form-submit";

const LoginContainer: FC = () => {
  const router = useRouter();
  const { user, isLoading: isLoadingUser, updateUser } = useCurrentUser();

  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!router.query.data && !isLoadingUser && user) {
      router.push("/");
    }
  }, [isLoadingUser, user, router]);

  const handleSubmit = (values: LoginFormSubmit): void => {
    setIsSubmitting(true);
    setError(null);

    axiosClient
      .post("/auth/login", values)
      .then((response) => {
        const decoded: DecodedToken = jwt_decode(response.data);
        updateUser({
          id: decoded.userId,
          avatarId: decoded.avatarId,
          avatarName: decoded.avatarName,
          avatarImageUrl: decoded.avatarImageUrl,
          avatarBackground: decoded.avatarBackground,
          avatarBorder: decoded.avatarBorder,
          username: decoded.username,
          email: decoded.email,
          countryCode: decoded.countryCode,
          xp: decoded.xp,
          isPremium: decoded.isPremium,
          stripeSessionId: decoded.stripeSessionId,
          token: response.data,
        });

        if (router.query.data) {
          const data = JSON.parse(router.query.data[0]);
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
    <LoginForm
      error={error}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    />
  );
};

export default LoginContainer;
