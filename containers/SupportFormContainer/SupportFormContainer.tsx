import React, { FC, useState } from "react";
import axiosClient from "../../axios";
import SupportForm from "../../components/SupportForm";
import { SupportFormSubmit } from "../../types/support-form-submit";

const SupportFormContainer: FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (values: SupportFormSubmit): void => {
    setIsSubmitting(true);
    axiosClient
      .post("/support", values)
      .then(() => setSubmitted(true))
      .catch(() => setError(true))
      .finally(() => setIsSubmitting(false));
  };

  return (
    <SupportForm
      isSubmitting={isSubmitting}
      submitted={submitted}
      error={error}
      onSubmit={handleSubmit}
    />
  );
};

export default SupportFormContainer;
