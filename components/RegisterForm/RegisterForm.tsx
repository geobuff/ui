import React, { FC, useContext, useState } from "react";

import {
  AuthCard,
  AuthView,
  ErrorAlertBanner,
} from "@geobuff/buff-ui/components";

import { Box, useBreakpointValue } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

import RegisterFormStepOneContainer from "../../containers/RegisterContainer/RegisterFormStepOneContainer";
import RegisterFormStepThreeContainer from "../../containers/RegisterContainer/RegisterFormStepThreeContainer";

import { RegisterFormSubmit } from "../../types/register-form-submit";
import LoginLink from "./LoginLink";
import RegisterFormStepTwo from "./RegisterFormStepTwo";

const initialValues = {
  avatarId: "7",
  username: "",
  email: "",
  countryCode: "",
  password: "",
};

interface Props {
  error?: string;
  onSubmit?: (values: RegisterFormSubmit) => void;
  isSubmitting?: boolean;
}

const RegisterForm: FC<Props> = ({
  error = "",
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

  const formContent = (
    <Box height="100%">
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={currentValidationScheme}
        onSubmit={onSubmit}
      >
        {({
          errors,
          values,
          setFieldValue,
          setFieldError,
        }): React.ReactNode => (
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
    </Box>
  );

  return (
    <>
      <ErrorAlertBanner error={error} />

      {!isMobile && (
        <Box position="absolute" top={0} right={0}>
          <LoginLink />
        </Box>
      )}

      <AuthView marginTop={{ base: 0, md: 16 }}>
        <AuthCard
          marginX="auto"
          marginY={4}
          maxWidth={{ base: "100%", md: 420 }}
          width="100%"
          zIndex={2}
        >
          {formContent}
          {isMobile && isFirstStep && <LoginLink />}
        </AuthCard>
      </AuthView>
    </>
  );
};

export default RegisterForm;
