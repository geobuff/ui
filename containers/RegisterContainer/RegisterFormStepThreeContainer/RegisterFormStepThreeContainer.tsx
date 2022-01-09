import React, { FC, useState } from "react";
import axiosClient from "../../../axios";
import RegisterFormStepThree from "../../../components/RegisterForm/RegisterFormStepThree";

export interface Props {
  values: any;
  isSubmitting: boolean;
  setFieldError: (field: string, message: string) => void;
  onSubmit: () => void;
  onPreviousStep: () => void;
}

const RegisterFormStepThreeContainer: FC<Props> = ({
  values,
  isSubmitting = false,
  setFieldError = () => {},
  onSubmit = () => {},
  onPreviousStep = () => {},
}) => {
  const [isValidating, setIsValidating] = useState(false);
  const [isValidUsername, setIsValidUsername] = useState(true);

  const handleCheckUsernameValidity = async (username: string) => {
    setIsValidating(true);

    const { data } = await axiosClient.get(`/auth/username/${username}`);

    setIsValidUsername(!data);
    setIsValidating(false);
    console.log(data, "data");

    if (data) {
      console.log("setting error!!");
      setFieldError(
        "username",
        "That username already exists. Pick something else!"
      );
    } else {
      onSubmit(values);
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
