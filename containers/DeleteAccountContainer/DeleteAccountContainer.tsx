import React, { useState, FC, useContext } from "react";

import axiosClient from "../../axios/axiosClient";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import DeleteAccountModal from "../../components/DeleteAccountModal";
import { useRouter } from "next/router";

interface Props {
  isOpen?: boolean;
  onClose?: () => void;
  userId?: number;
  possessive?: string;
}

const DeleteAccountContainer: FC<Props> = ({
  isOpen = false,
  onClose = (): void => {},
  userId = 0,
  possessive = "",
}) => {
  const router = useRouter();
  const { user, clearUser, getAuthConfig } = useContext(CurrentUserContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (): void => {
    setIsSubmitting(true);
    setError(false);

    axiosClient
      .delete(`/users/${userId}`, getAuthConfig())
      .then(() => {
        if (userId === user?.id) {
          clearUser();
          router.push("/");
        }

        onClose();
      })
      .catch(() => setError(true))
      .finally(() => setIsSubmitting(false));
  };

  return (
    <DeleteAccountModal
      isOpen={isOpen}
      possessive={possessive ? possessive : null}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      error={error}
    />
  );
};

export default DeleteAccountContainer;
