import React, { useState, FC, useContext } from "react";
import { useToast, useBreakpointValue, ToastPosition } from "@chakra-ui/react";

import UpdateUserFormModal from "../../components/UpdateUserFormModal";

import axiosClient from "../../axios/axiosClient";
import { userUpdated } from "../../helpers/toasts";
import { UpdateUserFormSubmit } from "../../types/update-user-form-submit";
import { CurrentUserContext } from "../../context/CurrentUserContext";

interface Props {
  isOpen?: boolean;
  onClose?: () => void;
}

const UpdateUserFormContainer: FC<Props> = ({
  isOpen = false,
  onClose = (): void => {},
}) => {
  const toast = useToast();
  const { user, updateUser, getAuthConfig } = useContext(CurrentUserContext);
  const toastPosition: ToastPosition = useBreakpointValue({
    base: "top",
    md: "bottom-right",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (values: UpdateUserFormSubmit): void => {
    setIsSubmitting(true);
    setError("");

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
        getAuthConfig()
      )
      .then((response) => {
        updateUser({
          ...user,
          avatarId: response.data.avatarId,
          avatarName: response.data.avatarName,
          avatarImageUrl: response.data.avatarImageUrl,
          avatarBackground: response.data.avatarBackground,
          avatarBorder: response.data.avatarBorder,
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
