import React, { useEffect, useState, FC } from "react";
import { useToast, useBreakpointValue, ToastPosition } from "@chakra-ui/react";

import UpdateUserFormModal from "../../components/UpdateUserFormModal";

import axiosClient from "../../axios/axiosClient";
import useCurrentUser from "../../hooks/UseCurrentUser";
import { userUpdated } from "../../helpers/toasts";

interface Props {
  isOpen?: boolean;
  onClose?: any;
}

const UpdateUserFormContainer: FC<Props> = ({
  isOpen = false,
  onClose = () => {},
}) => {
  const toast = useToast();
  const { user, isLoading: isUserLoading, updateUser } = useCurrentUser();
  const toastPosition: ToastPosition = useBreakpointValue({
    base: "top",
    md: "bottom-right",
  });

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
          avatarId: parseInt(values.avatarId),
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
          avatarId: response.data.avatarId,
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

export default UpdateUserFormContainer;
