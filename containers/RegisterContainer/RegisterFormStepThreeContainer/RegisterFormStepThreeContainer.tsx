import React, { FC, useState } from "react";
import axiosClient from "../../../axios";
import RegisterFormStepThree from "../../../components/RegisterForm/RegisterFormStepThree";

export interface Props {
  values: any;
  isSubmitting: boolean;
  onPreviousStep: () => void;
}

const RegisterFormStepThreeContainer: FC<Props> = ({
  values,
  isSubmitting = false,
  onPreviousStep = () => {},
}) => {
  const [isValidating, setIsValidating] = useState(false);
  const [isValidUsername, setIsValidUsername] = useState(true);

  const handleCheckUsernameValidity = async (username: string) => {
    setIsValidating(true);

    const { data } = await axiosClient.get(`/auth/username/${username}`);

    setIsValidUsername(!data);
    setIsValidating(false);
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
