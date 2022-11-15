import React, { FC, useContext, useState } from "react";
import axiosClient from "../../../axios";
import RegisterFormStepOne from "../../../components/RegisterForm/RegisterFormStepOne";
import { LanguageContext } from "../../../context/LanguageContext/LanguageContext";
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
        `${t.global.emailExistsValidationPartOne} ${email} ${t.global.emailExistsValidationPartTwo}`
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

export default RegisterFormStepOneContainer;
