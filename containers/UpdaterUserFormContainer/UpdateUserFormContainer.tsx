import React, { FC, useContext, useState } from "react";

import { ToastPosition, useBreakpointValue, useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

import { AppContext } from "../../context/AppContext";
import { CurrentUserContext } from "../../context/CurrentUserContext/CurrentUserContext";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

import UpdateUserFormModal from "../../components/UpdateUserFormModal";

import axiosClient from "../../axios/axiosClient";
import { genericToast } from "../../helpers/toasts";
import { UpdateUserFormSubmit } from "../../types/update-user-form-submit";

interface Props {
  isOpen?: boolean;
  onClose?: () => void;
}

const UpdateUserFormContainer: FC<Props> = ({
  isOpen = false,
  onClose = (): void => {},
}) => {
  const { t } = useContext(LanguageContext);
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
        toast(
          genericToast(
            t.toasts.userUpdatedTitle,
            t.toasts.userUpdatedDescription,
            9000,
            toastPosition
          )
        );
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
