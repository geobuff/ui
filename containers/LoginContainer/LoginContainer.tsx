import React, { useEffect, useState, FC, useContext } from "react";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";

import axiosClient from "../../axios/axiosClient";

import LoginForm from "../../components/LoginForm";
import { DecodedToken } from "../../types/decoded-token";
import { LoginFormSubmit } from "../../types/login-form-submit";
import { GameOverRedirect } from "../../types/game-over-redirect";
import { CurrentUserContext } from "../../context/CurrentUserContext";

const LoginContainer: FC = () => {
  const router = useRouter();
  const { user, isLoading: isLoadingUser, updateUser } = useContext(
    CurrentUserContext
  );

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
          avatarDescription: decoded.avatarDescription,
          avatarPrimaryImageUrl: decoded.avatarPrimaryImageUrl,
          avatarSecondaryImageUrl: decoded.avatarPrimaryImageUrl,
          username: decoded.username,
          email: decoded.email,
          countryCode: decoded.countryCode,
          xp: decoded.xp,
          isPremium: decoded.isPremium,
          token: response.data,
        });

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
    <LoginForm
      error={error}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    />
  );
};

export default LoginContainer;
