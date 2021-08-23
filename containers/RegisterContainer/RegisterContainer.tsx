import React, { useEffect, useState, FC } from "react";

import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";

import axiosClient from "../../axios/axiosClient";

import RegisterForm from "../../components/RegisterForm";
import useCurrentUser from "../../hooks/UseCurrentUser";

const RegisterContainer: FC = () => {
  const router = useRouter();
  const { user, updateUser, isLoading: isLoadingUser } = useCurrentUser();

  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!router.query.data && !isLoadingUser && user) {
      router.push("/");
    }
  }, [isLoadingUser, user, router]);

  // Clear error after 5 seconds to clear banner
  useEffect(() => {
    setTimeout(() => {
      if (error) {
        setError(null);
      }
    }, 7500);
  }, [error]);

  const handleSubmit = ({
    avatarId,
    username,
    email,
    countryCode,
    password,
  }) => {
    setIsSubmitting(true);
    setError(null);

    const payload = {
      avatarId: parseInt(avatarId),
      username,
      email,
      countryCode,
      password,
    };

    axiosClient
      .post("/auth/register", payload)
      .then((response) => {
        const decoded = jwt_decode(response.data);

        updateUser({
          id: decoded["userId"],
          avatarId: decoded["avatarId"],
          avatarName: decoded["avatarName"],
          avatarImageUrl: decoded["avatarImageUrl"],
          avatarBackground: decoded["avatarBackground"],
          avatarBorder: decoded["avatarBorder"],
          username: decoded["username"],
          email: decoded["email"],
          countryCode: decoded["countryCode"],
          xp: decoded["xp"],
          isPremium: decoded["isPremium"],
          stripeSessionId: decoded["stripeSessionId"],
          token: response?.data,
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
    <RegisterForm
      error={error}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    />
  );
};

export default RegisterContainer;
