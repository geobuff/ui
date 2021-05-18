import React from "react";
import PropTypes from "prop-types";
import { Formik, Field, Form } from "formik";

import {
  Alert,
  AlertIcon,
  Button,
  Fade,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Text,
  ScaleFade,
} from "@chakra-ui/react";

import Link from "next/link";

import SolidSuccessCircle from "../../Icons/SolidSuccessCircle";

const forgotPasswordExplainer =
  "Enter the email address you used when you joined and we’ll send you a link to reset your password.";

const ForgotPasswordForm = ({ error, hasResetPassword, onSubmit }) => {
  const successMessage = (
    <Fade in out>
      <Flex marginY={4} alignItems="center" direction="column">
        <ScaleFade initialScale={0.9} in>
          <SolidSuccessCircle height="60px" width="56px" color="green.500" />
        </ScaleFade>
        <Text marginTop={2} textAlign="center" fontWeight="500" fontSize="14px">
          {"Successfully sent password reset link. Please check your email."}
        </Text>
      </Flex>
    </Fade>
  );

  const form = (
    <>
      <Text fontSize="26px" marginY={2} fontWeight="800">
        {"Forgotten Password"}
      </Text>

      <Text marginTop={2} color="gray.600" fontSize="14px">
        {forgotPasswordExplainer}
      </Text>

      <Formik
        initialValues={{
          email: "",
        }}
        onSubmit={(values, actions) => {
          onSubmit(values);
          actions.setSubmitting(false);
        }}
      >
        {(formProps) => (
          <Form>
            <Field name="email">
              {({ field, form }) => (
                <FormControl
                  marginY={6}
                  isInvalid={form.errors.email && form.touched.email}
                >
                  <FormLabel htmlFor="email" fontWeight="bold" hidden>
                    {"Email"}
                  </FormLabel>

                  <Input
                    {...field}
                    id="email"
                    type="email"
                    placeholder="Enter email..."
                    size="lg"
                    fontSize="16px"
                    background="#F6F6F6"
                    borderRadius={6}
                    _placeholder={{ color: "gray.500" }}
                    _hover={{ background: "#e0e0e0" }}
                  />
                </FormControl>
              )}
            </Field>

            <Fade in={error} out={!error}>
              <Alert
                width="100%"
                status="error"
                backgroundColor="transparent"
                variant="subtle"
                borderRadius={6}
                marginY={2}
                paddingLeft={0}
                height="40px"
              >
                <Flex alignItems="center">
                  <AlertIcon
                    marginRight={2}
                    marginTop="1px"
                    color="red.400"
                    height="15px"
                  />
                  <Text color="red.500" fontWeight="500" fontSize="12px">
                    {error}
                  </Text>
                </Flex>
              </Alert>
            </Fade>

            <Flex marginTop="24px" marginBottom={0}>
              <Button
                size="lg"
                colorScheme="green"
                width="100%"
                type="submit"
                isLoading={formProps.isSubmitting}
              >
                {"Reset"}
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </>
  );

  return (
    <Flex
      marginTop={6}
      height="80vh"
      direction="column"
      justifyContent="center"
    >
      <Flex
        backgroundColor="white"
        borderRadius={12}
        boxShadow="0px 4px 4px rgba(179, 187, 209, 0.25)"
        direction="column"
        marginX="auto"
        marginY={5}
        padding={5}
        width={375}
      >
        <Flex
          justifyContent="center"
          marginTop={3}
          marginBottom={5}
          _hover={{ cursor: "pointer" }}
        >
          <Link href="/">
            <Image src="/logo.svg" height="42px" />
          </Link>
        </Flex>

        {hasResetPassword ? successMessage : form}
      </Flex>
    </Flex>
  );
};

ForgotPasswordForm.propTypes = {
  error: PropTypes.string,
  hasResetPassword: PropTypes.bool,
  onSubmit: PropTypes.func,
};
ForgotPasswordForm.defaultProps = {
  error: "",
  hasResetPassword: false,
  onSubmit: () => {},
};

export default ForgotPasswordForm;
