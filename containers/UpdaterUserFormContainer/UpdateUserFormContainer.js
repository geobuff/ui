import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useToast, useBreakpointValue } from "@chakra-ui/react";

import UpdateUserFormModal from "../../components/UpdateUserFormModal";

import axiosClient from "../../axios/axiosClient";
import useCurrentUser from "../../hooks/UseCurrentUser";
import { userUpdated } from "../../helpers/toasts";

const UpdateUserFormContainer = ({ isOpen, onClose }) => {
  const toast = useToast();
  const { user, isLoading: isUserLoading, updateUser } = useCurrentUser();
  const toastPosition = useBreakpointValue({ base: "top", md: "bottom-right" });

  const [config, setConfig] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isUserLoading && user) {
      setConfig({
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
    }
  }, [isUserLoading, user]);

  const handleSubmit = (values) => {
    setIsSubmitting(true);
    setError(null);

    axiosClient
      .put(
        `/users/${user.id}`,
        {
          avatarId: user.avatarId,
          username: values.username,
          email: values.email,
          countryCode: values.countryCode,
          xp: user.xp,
        },
        config
      )
      .then((response) => {
        updateUser({
          ...user,
          username: response.data.username,
          email: response.data.email,
          countryCode: response.data.countryCode,
        });

        onClose();
        toast(userUpdated(toastPosition));
      })
      .catch((error) => setError(error.response.data))
      .finally(() => setIsSubmitting(false));
  };

  return (
    <UpdateUserFormModal
      isOpen={isOpen}
      onClose={onClose}
      user={user}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      error={error}
    />
  );
};

UpdateUserFormContainer.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
UpdateUserFormContainer.defaultProps = {
  isOpen: false,
  onClose: () => {},
};

export default UpdateUserFormContainer;
