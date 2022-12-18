import React, { FC, useContext, useState } from "react";

import { ToastPosition, useBreakpointValue, useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

import { AppContext } from "../../contexts/AppContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { LanguageContext } from "../../contexts/LanguageContext";

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

  const { isNotchedIphone, setError } = useContext(AppContext);

  const toastPosition: ToastPosition = useBreakpointValue({
    base: "bottom",
    md: "bottom-right",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (values: UpdateUserFormSubmit): void => {
    setIsSubmitting(true);
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
    />
  );
};

export default UpdateUserFormContainer;
