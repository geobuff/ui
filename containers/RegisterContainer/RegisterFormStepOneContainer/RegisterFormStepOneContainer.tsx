import React, { FC, useState } from "react";
import axiosClient from "../../../axios";
import RegisterFormStepOne from "../../../components/RegisterForm/RegisterFormStepOne";
import { RegisterFormSubmit } from "../../../types/register-form-submit";

export interface Props {
  errors: Record<string, string>;
  values: RegisterFormSubmit;
  setFieldError: (field: string, message: string) => void;
  onNextStep: () => void;
}

const RegisterFormStepOneContainer: FC<Props> = ({
  errors,
  values,
  setFieldError = () => {},
  onNextStep = () => {},
}) => {
  const [isValidating, setIsValidating] = useState(false);

  const handleCheckEmailValidity = async (email: string) => {
    setIsValidating(true);

    const { data } = await axiosClient.get(`/auth/email/${email}`);

    if (!data) {
      onNextStep();
    } else {
      setFieldError("email", `An account with email ${email} already exists.`);
    }

    setIsValidating(false);
  };

  return (
    <RegisterFormStepOne
      errors={errors}
      values={values}
      isValidating={isValidating}
      onCheckEmailValidity={handleCheckEmailValidity}
    />
  );
};

export default RegisterFormStepOneContainer;
