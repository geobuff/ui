import React, { FC, useMemo, useState } from "react";
import * as Yup from "yup";

import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";
import { Formik, Form } from "formik";

import AuthView from "../AuthView";
import AuthCard from "../AuthCard";
import ErrorAlertBanner from "../ErrorAlertBanner";

import LoginLink from "./LoginLink";
import { RegisterFormSubmit } from "../../types/register-form-submit";

import RegisterFormStepTwo from "./RegisterFormStepTwo";
import RegisterFormStepOneContainer from "../../containers/RegisterContainer/RegisterFormStepOneContainer";
import RegisterFormStepThreeContainer from "../../containers/RegisterContainer/RegisterFormStepThreeContainer";

const initialValues = {
  avatarId: "1",
  username: "",
  email: "",
  countryCode: "",
  password: "",
};

const validationSchema = [
  Yup.object().shape({
    email: Yup.string()
      .required("Please include an email.")
      .email("Must be a valid email address."),
    password: Yup.string()
      .required("Please include a password.")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        "Must contain at least 8 characters, one uppercase letter, one lowercase letter and one number."
      ),
  }),
  Yup.object().shape({
    avatarId: Yup.number().required("Please select an avatar."),
  }),
  Yup.object().shape({
    username: Yup.string()
      .required("Please include a username.")
      .min(3, "Must be at least 3 characters long.")
      .max(20, "Must be 20 or less characters long.")
      .matches(/^\S*$/, "Cannot contain spaces."),
    countryCode: Yup.string().required("Please select a country."),
  }),
];

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

  const [currentStep, setCurrentStep] = useState(0);

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

      <AuthView marginTop={{ base: 6, md: 16 }}>
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
