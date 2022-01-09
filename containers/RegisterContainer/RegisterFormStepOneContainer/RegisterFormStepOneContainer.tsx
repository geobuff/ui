import React, { FC, useState } from "react";
import axiosClient from "../../../axios";
import RegisterFormStepOne from "../../../components/RegisterForm/RegisterFormStepOne";

export interface Props {
  values: any;
  onNextStep: () => void;
}

const RegisterFormStepOneContainer: FC<Props> = ({
  values,
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
    }
  };

  return (
    <RegisterFormStepOne
      onCheckEmailValidity={handleCheckEmailValidity}
      isValidating={isValidating}
      isValidEmail={isValidEmail}
      values={values}
    />
  );
};

export default RegisterFormStepOneContainer;
