import React, { FC, useContext, useState } from "react";

import { RegisterForm } from "@geobuff/buff-ui/components";

import { Box, useBreakpointValue } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { LanguageContext } from "../contexts/LanguageContext";

import { RegisterFormStepTwo } from "../components/RegisterFormStepTwo/RegisterFormStepTwo";

import { RegisterFormSubmit } from "../types/register-form-submit";
import { RegisterFormStepOneContainer } from "./RegisterFormStepOneContainer";
import { RegisterFormStepThreeContainer } from "./RegisterFormStepThreeContainer";

const initialValues = {
  avatarId: "7",
  username: "",
  email: "",
  countryCode: "",
  password: "",
};

interface Props {
  onSubmit?: (values: RegisterFormSubmit) => void;
  isSubmitting?: boolean;
}

export const RegisterFormContainer: FC<Props> = ({
  onSubmit = () => {},
  isSubmitting = false,
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { t } = useContext(LanguageContext);

  const [currentStep, setCurrentStep] = useState(0);

  const validationSchema = [
    Yup.object().shape({
      email: Yup.string()
        .required(t.validations.emailRequired)
        .email(t.validations.emailValid),
      password: Yup.string()
        .required(t.validations.passwordRequired)
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
          t.validations.passwordMatch
        ),
    }),
    Yup.object().shape({
      avatarId: Yup.number().required(t.validations.avatarRequired),
    }),
    Yup.object().shape({
      username: Yup.string()
        .required(t.validations.usernameRequired)
        .min(3, t.validations.usernameMin)
        .max(20, t.validations.usernameMax)
        .matches(/^\S*$/, t.validations.usernameMatch),
      countryCode: Yup.string().required(t.validations.countryRequired),
    }),
  ];

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => setCurrentStep(currentStep - 1);

  const getCurrentStepComponent = (props) => {
    switch (currentStep) {
      case 0:
        return <RegisterFormStepOneContainer {...props} />;
      case 1:
        return <RegisterFormStepTwo {...props} />;
      case 2:
        return <RegisterFormStepThreeContainer {...props} />;
      default:
        break;
    }
  };

  const currentValidationScheme = validationSchema[currentStep];
  const isFirstStep = currentStep === 0;

  const form = (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={currentValidationScheme}
      onSubmit={onSubmit}
    >
      {({ errors, values, setFieldValue, setFieldError }): React.ReactNode => (
        <Form>
          <Box marginBottom={1}>
            {getCurrentStepComponent({
              errors,
              values,
              isSubmitting,
              setFieldValue,
              setFieldError,
              onPreviousStep: handlePreviousStep,
              onNextStep: handleNextStep,
            })}
          </Box>
        </Form>
      )}
    </Formik>
  );

  return (
    <RegisterForm
      isMobile={isMobile}
      isFirstStep={isFirstStep}
      linkMessage={t.loginLink.message}
      linkAction={t.loginLink.action}
      linkHref="/login"
    >
      {form}
    </RegisterForm>
  );
};
