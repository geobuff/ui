import React, { useEffect, useState, FC, useContext } from "react";

import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";

import axiosClient from "../../axios/axiosClient";

import RegisterForm from "../../components/RegisterForm";
import { DecodedToken } from "../../types/decoded-token";
import { RegisterFormSubmit } from "../../types/register-form-submit";
import { GameOverRedirect } from "../../types/game-over-redirect";
import { CurrentUserContext } from "../../context/CurrentUserContext";

const RegisterContainer: FC = () => {
  const router = useRouter();
  const { user, updateUser, isLoading: isLoadingUser } = useContext(
    CurrentUserContext
  );

  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

  const handleSubmit = (values: RegisterFormSubmit): void => {
    setIsSubmitting(true);
    setError(null);

    const payload = {
      avatarId: parseInt(values.avatarId),
      username: values.username,
      email: values.email,
      countryCode: values.countryCode,
      password: values.password,
    };

    axiosClient
      .post("/auth/register", payload)
      .then((response) => {
        const decoded: DecodedToken = jwt_decode(response.data);

        updateUser({
          id: decoded.userId,
          avatarId: decoded.avatarId,
          avatarName: decoded.avatarName,
          avatarDescription: decoded.avatarDescription,
          avatarPrimaryImageUrl: decoded.avatarPrimaryImageUrl,
          avatarSecondaryImageUrl: decoded.avatarSecondaryImageUrl,
          username: decoded.username,
          email: decoded.email,
          countryCode: decoded.countryCode,
          xp: decoded.xp,
          isPremium: decoded.isPremium,
          joined: decoded.joined,
          token: response?.data,
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
          setIsSuccess(true);
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
      isSuccess={isSuccess}
    />
  );
};

export default RegisterContainer;
