import React, { useState, FC, useContext } from "react";

import axiosClient from "../../axios/axiosClient";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import DeleteAccountModal from "../../components/DeleteAccountModal";
import { useRouter } from "next/router";

interface Props {
  isOpen?: boolean;
  onClose?: () => void;
}

const UpdateUserFormContainer: FC<Props> = ({
  isOpen = false,
  onClose = (): void => {},
}) => {
  const router = useRouter();
  const { user, clearUser, getAuthConfig } = useContext(CurrentUserContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (): void => {
    setIsSubmitting(true);
    setError(false);

    axiosClient
      .delete(`/users/${user.id}`, getAuthConfig())
      .then(() => {
        clearUser();
        onClose();
        router.push("/");
      })
      .catch(() => setError(true))
      .finally(() => setIsSubmitting(false));
  };

  return (
    <DeleteAccountModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      error={error}
    />
  );
};

export default UpdateUserFormContainer;
