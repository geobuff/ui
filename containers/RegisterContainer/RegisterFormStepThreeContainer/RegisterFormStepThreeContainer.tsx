import React, { FC, useState } from "react";

import { useFormikContext } from "formik";

import RegisterFormStepThree from "../../../components/RegisterForm/RegisterFormStepThree";

import axiosClient from "../../../axios";
import { RegisterFormSubmit } from "../../../types/register-form-submit";

export interface Props {
  values: RegisterFormSubmit;
  isSubmitting: boolean;
  setFieldError: (field: string, message: string) => void;
  onPreviousStep: () => void;
}

const RegisterFormStepThreeContainer: FC<Props> = ({
  values,
  isSubmitting = false,
  setFieldError = () => {},
  onPreviousStep = () => {},
}) => {
  const { submitForm } = useFormikContext();

  const [isValidating, setIsValidating] = useState(false);
  const [isValidUsername, setIsValidUsername] = useState(true);

  const handleCheckUsernameValidity = async (username: string) => {
    setIsValidating(true);

    const { data: usernameExists } = await axiosClient.get(
      `/auth/username/${username}`
    );

    setIsValidUsername(!usernameExists);
    setIsValidating(false);

    if (usernameExists) {
      setFieldError(
        "username",
        "That username already exists. Pick something else!"
      );
    } else {
      setTimeout(() => {
        submitForm();
      }, 20);
    }
  };

  return (
    <RegisterFormStepThree
      values={values}
      isValidating={isValidating}
      isValidUsername={isValidUsername}
      isSubmitting={isSubmitting}
      onCheckUsernameValidity={handleCheckUsernameValidity}
      onPreviousStep={onPreviousStep}
    />
  );
};

export default RegisterFormStepThreeContainer;
