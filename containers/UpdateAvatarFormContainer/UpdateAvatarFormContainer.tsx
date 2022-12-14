import React, { FC, useContext, useState } from "react";

import { ToastPosition, useBreakpointValue, useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

import { AppContext } from "../../context/AppContext";
import { CurrentUserContext } from "../../context/CurrentUserContext/CurrentUserContext";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

import UpdateAvatarFormModal from "../../components/UpdateAvatarFormModal";

import axiosClient from "../../axios";
import { genericToast } from "../../helpers/toasts";
import { UpdateAvatarFormSubmit } from "../../types/update-avatar-form-submit";

interface Props {
  isOpen?: boolean;
  onClose?: () => void;
}

const UpdateAvatarFormContainer: FC<Props> = ({
  isOpen = false,
  onClose = (): void => {},
}) => {
  const { t } = useContext(LanguageContext);
  const toast = useToast();
  const { isNotchedIphone, setError } = useContext(AppContext);

  const { user, updateUser } = useContext(CurrentUserContext);
  const { data: session } = useSession();

  const toastPosition: ToastPosition = useBreakpointValue({
    base: "bottom",
    md: "bottom-right",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (values: UpdateAvatarFormSubmit): void => {
    setIsSubmitting(true);
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
        session?.authConfig
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
        toast(
          genericToast(
            t.toasts.avatarUpdatedTitle,
            t.toasts.avatarUpdatedDescription,
            9000,
            toastPosition
          )
        );
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
      isNotchedIphone={isNotchedIphone}
    />
  );
};

export default UpdateAvatarFormContainer;
