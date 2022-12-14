import React, { FC, useContext, useState } from "react";

import { LanguageContext } from "../context/LanguageContext/LanguageContext";

import { RegisterFormStepOne } from "../components/RegisterFormStepOne/RegisterFormStepOne";

import axiosClient from "../axios";
import { RegisterFormSubmit } from "../types/register-form-submit";

export interface RegisterFormStepOneContainerProps {
  errors: Record<string, string>;
  values: RegisterFormSubmit;
  setFieldError: (field: string, message: string) => void;
  onNextStep: () => void;
}

export const RegisterFormStepOneContainer: FC<
  RegisterFormStepOneContainerProps
> = ({ errors, values, setFieldError = () => {}, onNextStep = () => {} }) => {
  const [isValidating, setIsValidating] = useState(false);
  const [hasSubmittedOnce, setHasSubmittedOnce] = useState(false);

  const { t } = useContext(LanguageContext);

  const handleCheckEmailValidity = async (email: string) => {
    setIsValidating(true);

    const { data: emailExists } = await axiosClient.get(`/auth/email/${email}`);

    if (!emailExists) {
      setTimeout(() => {
        onNextStep();
      }, 20);
    } else {
      setFieldError(
        "email",
        `${t.validations.emailExistsPartOne} ${email} ${t.global.emailExistsPartTwo}`
      );
    }

    setHasSubmittedOnce(true);
    setIsValidating(false);
  };

  return (
    <RegisterFormStepOne
      errors={errors}
      hasSubmittedOnce={hasSubmittedOnce}
      values={values}
      isValidating={isValidating}
      onCheckEmailValidity={handleCheckEmailValidity}
    />
  );
};
