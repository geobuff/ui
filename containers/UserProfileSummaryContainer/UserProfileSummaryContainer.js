import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useToast } from "@chakra-ui/react";

import UserProfileSummary from "../../components/UserProfileSummary";
import axiosClient from "../../axios/axiosClient";
import useCurrentUser from "../../hooks/UseCurrentUser";

const UserProfileSummaryContainer = ({ user }) => {
  const toast = useToast();

  const { updateUser } = useCurrentUser();

  const [config, setConfig] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      setConfig({
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
    }
  }, [user]);

  const handleSubmit = (values) => {
    setIsSubmitting(true);
    setError(null);

    const update = {
      username: values.username,
      email: values.email,
      countryCode: values.countryCode,
      xp: user.xp,
    };

    axiosClient
      .put(`/users/${user.id}`, update, config)
      .then((response) => {
        updateUser({
          id: response.data.id,
          username: response.data.username,
          email: response.data.email,
          countryCode: response.data.countryCode,
          xp: response.data.xp,
          isPremium: response.data.isPremium,
          token: user.token,
        });

        toast({
          position: "bottom-right",
          title: "User Updated",
          description: "Successfully updated user details.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((error) => setError(error.response.data))
      .finally(() => setIsSubmitting(false));
  };

  return (
    <UserProfileSummary
      user={user}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      error={error}
    />
  );
};

UserProfileSummaryContainer.propTypes = {
  user: PropTypes.object,
};

export default UserProfileSummaryContainer;
