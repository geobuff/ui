import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";

import axiosClient from "../../axios/axiosClient";

import RegisterForm from "../../components/RegisterForm";
import useCurrentUser from "../../hooks/UseCurrentUser";

const RegisterContainer = () => {
  const router = useRouter();
  const { user, updateUser, isLoading: isLoadingUser } = useCurrentUser();

  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoadingUser && user) {
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

  const handleSubmit = ({ username, email, countryCode, password }) => {
    setIsSubmitting(true);
    setError(null);
    axiosClient
      .post("/auth/register", { username, email, countryCode, password })
      .then((response) => {
        const decoded = jwt_decode(response.data);

        updateUser({
          id: decoded["userId"],
          username: decoded["username"],
          email: decoded["email"],
          countryCode: decoded["countryCode"],
          xp: decoded["xp"],
          isPremium: decoded["isPremium"],
          stripeSessionId: decoded["stripeSessionId"],
          token: response?.data,
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

  return (
    <RegisterForm
      error={error}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    />
  );
};

RegisterContainer.propTypes = {
  quizzes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      maxScore: PropTypes.number,
      time: PropTypes.number,
      mapSVG: PropTypes.string,
      imageUrl: PropTypes.string,
      verb: PropTypes.string,
      apiPath: PropTypes.string,
      route: PropTypes.string,
      hasLeaderboard: PropTypes.bool,
      hasGrouping: PropTypes.bool,
      enabled: PropTypes.bool,
    })
  ),
};
RegisterContainer.defaultProps = {
  quizzes: [],
};

export default RegisterContainer;
