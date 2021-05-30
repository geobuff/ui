import React, { useState } from "react";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";

import axiosClient from "../../axios/axiosClient";
import useCurrentUser from "../../hooks/UseCurrentUser";

import LoginForm from "../../components/LoginForm";

const LoginContainer = () => {
  const router = useRouter();
  const { user, isLoading: isLoadingUser, updateUser } = useCurrentUser();

  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isLoadingUser && user) {
    router.push("/");
  }

  const login = (email, password) => {
    setIsSubmitting(true);
    setError(null);
    const login = { email, password };
    axiosClient
      .post("/auth/login", login)
      .then((response) => {
        const decoded = jwt_decode(response.data);
        updateUser({
          id: decoded["userId"],
          avatarId: decoded["avatarId"],
          username: decoded["username"],
          email: decoded["email"],
          countryCode: decoded["countryCode"],
          xp: decoded["xp"],
          isPremium: decoded["isPremium"],
          stripeSessionId: decoded["stripeSessionId"],
          token: response.data,
        });

        if (router.query.data) {
          const data = JSON.parse(router.query.data);
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

  const handleSubmit = ({ email, password }) => login(email, password);

  return (
    <LoginForm
      error={error}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    />
  );
};

export default LoginContainer;
