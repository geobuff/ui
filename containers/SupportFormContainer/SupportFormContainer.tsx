import React, { FC, useState } from "react";
import axiosClient from "../../axios";
import SupportFormModal from "../../components/SupportFormModal";
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
    />
  );
};

export default SupportFormContainer;
