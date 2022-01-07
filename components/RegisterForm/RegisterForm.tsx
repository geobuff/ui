import React, { FC, useState } from "react";
import * as Yup from "yup";

import {
  Button,
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link as ChakraLink,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";

import Link from "next/link";

import AuthView from "../AuthView";
import AuthCard from "../AuthCard";
import ErrorAlertBanner from "../ErrorAlertBanner";
import Logo from "../Logo";

import LoginLink from "./LoginLink";
import { RegisterFormSubmit } from "../../types/register-form-submit";

import RegisterFormStepOne from "./RegisterFormStepOne";
import RegisterFormStepTwo from "./RegisterFormStepTwo";
import RegisterFormStepThree from "./RegisterFormStepThree";

const initialValues = {
  avatarId: "1",
  username: "",
  email: "",
  countryCode: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  avatarId: Yup.number().required("Please select an avatar."),
  username: Yup.string()
    .required("Please include a username.")
    .min(3, "Must be at least 3 characters long.")
    .max(20, "Must be 20 or less characters long.")
    .matches(/^\S*$/, "Cannot contain spaces."),
  countryCode: Yup.string().required("Please select a country."),
  email: Yup.string()
    .required("Please include an email.")
    .email("Must be a valid email address."),
  password: Yup.string()
    .required("Please include a password.")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      "Must contain at least 8 characters, one uppercase letter, one lowercase letter and one number."
    ),
});

interface Props {
  error?: string;
  onSubmit?: (values: RegisterFormSubmit) => void;
  isSubmitting?: boolean;
}

const RegisterForm: FC<Props> = ({
  error = "",
  onSubmit = (values: RegisterFormSubmit): void => {},
  isSubmitting = false,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const shouldRenderOnMobile = useBreakpointValue({ base: false, md: true });

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const getCurrentStepComponent = (props) => {
    switch (currentStep) {
      case 1:
        return <RegisterFormStepOne />;
      case 2:
        return <RegisterFormStepTwo {...props} />;
      case 3:
        return <RegisterFormStepThree />;

      default:
        break;
    }
  };

  const mainContent = (
    <>
      <Flex
        justifyContent="center"
        marginTop={3}
        marginBottom={5}
        height="100%"
        _hover={{ cursor: "pointer" }}
      >
        <Link href="/">
          <ChakraLink>
            <Logo height="42px" width="200px" />
          </ChakraLink>
        </Link>
      </Flex>

      <Text fontSize="26px" marginY={1} fontWeight="800">
        {"Create an Account"}
      </Text>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ setFieldValue }): React.ReactNode => (
          <Form>
            <Box marginBottom={5}>
              {getCurrentStepComponent(setFieldValue)}

              <Flex marginTop="44px" marginBottom={0}>
                <Button
                  size="lg"
                  colorScheme="green"
                  width="100%"
                  type="submit"
                  // isLoading={isSubmitting}
                  onClick={handleNextStep}
                >
                  {"Next"}
                </Button>
              </Flex>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );

  return (
    <>
      {shouldRenderOnMobile ? (
        <>
          <ErrorAlertBanner error={error} />

          <Box position="absolute" top={0} right={0}>
            <LoginLink />
          </Box>

          <AuthView marginTop="32px" height="100%">
            <AuthCard
              marginX="auto"
              marginY={4}
              height="100%"
              width={420}
              zIndex={2}
            >
              {mainContent}
            </AuthCard>
          </AuthView>
        </>
      ) : (
        <>
          <ErrorAlertBanner error={error} />
          <Flex direction="column" padding={5}>
            {mainContent}
            <LoginLink />
          </Flex>
        </>
      )}
    </>
  );
};

export default RegisterForm;
