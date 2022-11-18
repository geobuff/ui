import React, { FC, useState } from "react";

import { useSession } from "next-auth/react";

import SupportFormModal from "../../components/SupportFormModal";

import axiosClient from "../../axios";
import { AuthUser } from "../../types/auth-user";
import { SupportFormSubmit } from "../../types/support-form-submit";

interface Props {
  isOpen?: boolean;
  onClose?: () => void;
  setSubmitted?: React.Dispatch<React.SetStateAction<boolean>>;
}

const SupportFormContainer: FC<Props> = ({
  isOpen = false,
  onClose = (): void => {},
  setSubmitted = (): void => {},
}) => {
  const { data: session } = useSession();
  const user = session?.user as AuthUser;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (values: SupportFormSubmit): void => {
    setIsSubmitting(true);
    axiosClient
      .post("/support", values)
      .then(() => {
        setSubmitted(true);
        onClose();
      })
      .catch((error) => setError(error.response.data))
      .finally(() => setIsSubmitting(false));
  };

  return (
    <SupportFormModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      error={error}
      from={user?.email}
    />
  );
};

export default SupportFormContainer;
