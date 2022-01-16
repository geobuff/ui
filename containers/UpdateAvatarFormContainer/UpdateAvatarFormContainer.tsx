import React, { FC, useContext, useState } from "react";
import { ToastPosition, useBreakpointValue, useToast } from "@chakra-ui/react";
import axiosClient from "../../axios";

import { CurrentUserContext } from "../../context/CurrentUserContext";
import { avatarUpdated } from "../../helpers/toasts";
import UpdateAvatarFormModal from "../../components/UpdateAvatarFormModal";
import { UpdateAvatarFormSubmit } from "../../types/update-avatar-form-submit";

interface Props {
  isOpen?: boolean;
  onClose?: () => void;
}

const UpdateAvatarFormContainer: FC<Props> = ({
  isOpen = false,
  onClose = (): void => {},
}) => {
  const toast = useToast();
  const { user, updateUser, getAuthConfig } = useContext(CurrentUserContext);
  const toastPosition: ToastPosition = useBreakpointValue({
    base: "bottom",
    md: "bottom-right",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (values: UpdateAvatarFormSubmit): void => {
    setIsSubmitting(true);
    setError("");

    axiosClient
      .put(
        `/users/${user.id}`,
        {
          avatarId: parseInt(values.avatarId),
          username: user.username,
          email: user.email,
          countryCode: user.countryCode,
          xp: user.xp,
        },
        getAuthConfig()
      )
      .then((response) => {
        updateUser({
          ...user,
          avatarId: response.data.avatarId,
          avatarName: response.data.avatarName,
          avatarDescription: response.data.avatarDescription,
          avatarPrimaryImageUrl: response.data.avatarPrimaryImageUrl,
          avatarSecondaryImageUrl: response.data.avatarSecondaryImageUrl,
        });

        onClose();
        toast(avatarUpdated(toastPosition));
      })
      .catch((error) => setError(error.response.data))
      .finally(() => setIsSubmitting(false));
  };

  return (
    <UpdateAvatarFormModal
      isOpen={isOpen}
      onClose={onClose}
      avatarId={user?.avatarId}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      error={error}
    />
  );
};

export default UpdateAvatarFormContainer;
