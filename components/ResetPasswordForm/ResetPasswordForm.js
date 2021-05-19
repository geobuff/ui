import React from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";

import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Fade,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  Link as ChakraLink,
  Text,
  ScaleFade,
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";

import SolidSuccessCircle from "../../Icons/SolidSuccessCircle";
import SolidSubtractCircle from "../../Icons/SolidSubtractCircle";

import Link from "next/link";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Please include a password.")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      "Must contain at least 8 characters, one uppercase letter, one lowercase letter and one number."
    ),
});

const resetPasswordExplainer =
  "Enter your new password. Make sure it's secure and different to your last one.";

const ResetPasswordForm = ({ error, isSuccess, onSubmit }) => {
  const successMessage = (
    <Fade in out>
      <Flex marginBottom={4} alignItems="center" direction="column">
        <ScaleFade initialScale={0.75} in>
          <SolidSuccessCircle
            marginBottom={2}
            height="60px"
            width="56px"
            color="green.500"
          />
        </ScaleFade>
        <Text textAlign="center" fontWeight="bold" marginBottom={1}>
          {"Successfully updated password!"}
        </Text>

        <Text color="gray.600" textAlign="center" fontSize="14px">
          {"Please "}
          <Link href="/login">
            <ChakraLink
              fontWeight={600}
              _hover={{ textDecoration: "underline" }}
            >
              {"login"}
            </ChakraLink>
          </Link>
          {" to continue."}
        </Text>
      </Flex>
    </Fade>
  );

  const errorMessage = (
    <Flex marginBottom={4} alignItems="center" direction="column">
      <ScaleFade initialScale={0.75} in>
        <SolidSubtractCircle
          marginBottom={2}
          height="60px"
          width="56px"
          color="red.500"
        />
      </ScaleFade>
      <Text
        textAlign="center"
        fontSize="14px"
        fontWeight="bold"
        marginBottom={4}
      >
        {error}
      </Text>

      <Link href="/forgot-password">
        <Button size="sm" variant="outline" color="gray.600">
          {"Request New Token"}
        </Button>
      </Link>
    </Flex>
  );

  const form = (
    <>
      <Text fontSize="26px" marginY={2} fontWeight="800">
        {"Reset Your Password"}
      </Text>

      <Text marginTop={2} color="gray.600" fontSize="14px">
        {resetPasswordExplainer}
      </Text>
      <Formik
        initialValues={{ password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          onSubmit(values);
          actions.setSubmitting(false);
        }}
      >
        {(formProps) => (
          <Form>
            <Field name="password">
              {({ field, form }) => (
                <FormControl
                  marginY={6}
                  isInvalid={form.errors.password && form.touched.password}
                >
                  <FormLabel htmlFor="password" hidden>
                    {"Password"}
                  </FormLabel>
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    placeholder="Enter new password..."
                    size="lg"
                    fontSize="16px"
                    background="#F6F6F6"
                    borderRadius={6}
                    _placeholder={{ color: "gray.500" }}
                    _hover={{ background: "#e0e0e0" }}
                  />
                  <Box position="absolute" top="38px" left="2px">
                    <FormErrorMessage fontSize="11px">
                      {form.errors.password}
                    </FormErrorMessage>
                  </Box>
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

  const getViewComponent = () => {
    if (error) {
      return errorMessage;
    }
    if (isSuccess) {
      return successMessage;
    }

    return form;
  };

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

        {getViewComponent()}
      </Flex>
    </Flex>
  );
};

ResetPasswordForm.propTypes = {
  error: PropTypes.string,
  isSuccess: PropTypes.bool,
  onSubmit: PropTypes.func,
};
ResetPasswordForm.defaultProps = {
  error: "",
  isSuccess: false,
  onSubmit: () => {},
};

export default ResetPasswordForm;
