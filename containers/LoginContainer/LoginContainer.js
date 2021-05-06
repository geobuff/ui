import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";

import axiosClient from "../../axios/axiosClient";
import useCurrentUser from "../../hooks/UseCurrentUser";

import Login from "../../components/Login";

const LoginContainer = () => {
  const router = useRouter();
  const { user, isLoading: isLoadingUser, updateUser } = useCurrentUser();

  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isLoadingUser && user) {
      router.push("/");
    }
  }, [isLoadingUser, user, router]);

  const login = (email, password) => {
    setError(null);
    const login = { email, password };
    axiosClient
      .post("/auth/login", login)
      .then((response) => {
        const decoded = jwt_decode(response.data);
        const user = {
          id: decoded["userId"],
          username: decoded["username"],
          email: decoded["email"],
          countryCode: decoded["countryCode"],
          xp: decoded["xp"],
          isPremium: decoded["isPremium"],
          token: response.data,
        };
        updateUser(user);
        router.push("/");
      })
      .catch((error) => {
        setError(error.response.data);
      });
  };

  const handleSubmit = (values, actions) => {
    login(values.email, values.password);
    actions.setSubmitting(false);
  };

  if (isLoadingUser || user) {
    return null;
  }

  return <Login error={error} user={user} onSubmit={handleSubmit} />;
};

export default LoginContainer;
