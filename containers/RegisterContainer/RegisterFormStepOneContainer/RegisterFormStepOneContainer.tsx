import React, { FC, useState } from "react";
import axiosClient from "../../../axios";
import RegisterFormStepOne from "../../../components/RegisterForm/RegisterFormStepOne";

export interface Props {
  errors: any;
  values: any;
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
  const [isValidEmail, setIsValidEmail] = useState(true);

  const handleCheckEmailValidity = async (email: string) => {
    setIsValidating(true);

    const { data } = await axiosClient.get(`/auth/email/${email}`);

    setIsValidEmail(!data);
    setIsValidating(false);

    if (!data) {
      onNextStep();
    } else {
      setFieldError("email", `An account with email ${email} already exists.`);
    }
  };

  return (
    <RegisterFormStepOne
      errors={errors}
      values={values}
      isValidating={isValidating}
      isValidEmail={isValidEmail}
      onCheckEmailValidity={handleCheckEmailValidity}
    />
  );
};

export default RegisterFormStepOneContainer;
