import React, { FC, useContext, useState } from "react";
import { ToastPosition, useBreakpointValue, useToast } from "@chakra-ui/react";
import axiosClient from "../../axios";

import { avatarUpdated } from "../../helpers/toasts";
import UpdateAvatarFormModal from "../../components/UpdateAvatarFormModal";
import { UpdateAvatarFormSubmit } from "../../types/update-avatar-form-submit";
import { AppContext } from "../../context/AppContext";
import { useSession } from "next-auth/react";
import { AuthUser } from "../../types/auth-user";

interface Props {
  isOpen?: boolean;
  onClose?: () => void;
}

const UpdateAvatarFormContainer: FC<Props> = ({
  isOpen = false,
  onClose = (): void => {},
}) => {
  const toast = useToast();
  const { isNotchedIphone } = useContext(AppContext);

  const { data: session } = useSession();
  const user = session?.user as AuthUser;

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
        user?.authConfig
      )
      .then(() => {
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
      isNotchedIphone={isNotchedIphone}
      error={error}
    />
  );
};

export default UpdateAvatarFormContainer;
