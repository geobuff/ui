import React, { useState, FC, useContext } from "react";
import { useToast, useBreakpointValue, ToastPosition } from "@chakra-ui/react";

import UpdateUserFormModal from "../../components/UpdateUserFormModal";

import axiosClient from "../../axios/axiosClient";
import { userUpdated } from "../../helpers/toasts";
import { UpdateUserFormSubmit } from "../../types/update-user-form-submit";
import { AppContext } from "../../context/AppContext";
import { useSession } from "next-auth/react";
import { CurrentUserContext } from "../../context/CurrentUserContext/CurrentUserContext";

interface Props {
  isOpen?: boolean;
  onClose?: () => void;
}

const UpdateUserFormContainer: FC<Props> = ({
  isOpen = false,
  onClose = (): void => {},
}) => {
  const toast = useToast();

  const { user, updateUser } = useContext(CurrentUserContext);
  const { data: session } = useSession();

  const { isNotchedIphone } = useContext(AppContext);

  const toastPosition: ToastPosition = useBreakpointValue({
    base: "bottom",
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
          avatarId: user?.avatarId,
          username: values.username,
          email: values.email,
          countryCode: values.countryCode,
          xp: user.xp,
        },
        session?.authConfig
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
      isNotchedIphone={isNotchedIphone}
      error={error}
    />
  );
};

export default UpdateUserFormContainer;
