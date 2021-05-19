import React from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";

import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Image,
  Link as ChakraLink,
  Text,
  Fade,
} from "@chakra-ui/react";

import Link from "next/link";

import { Formik, Field, Form } from "formik";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Please include an email."),
  password: Yup.string()
    .required("Please include a password.")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      "Must contain at least 8 characters, least one uppercase letter, one lowercase letter and one number."
    ),
});

const LoginForm = ({ error, onSubmit }) => {
  return (
    <>
      <Box position="absolute" top={0} right={0}>
        <Flex direction="row" margin={{ sm: 3, md: 5 }}>
          <Text fontSize="14px" marginRight={1} fontWeight="500">
            {"Don't have an account?"}
          </Text>
          <Link href="/register">
            <ChakraLink
              fontSize="14px"
              fontWeight="500"
              textDecoration="underline"
              _hover={{
                color: "#5c5c5c",
              }}
            >
              {"Sign up today"}
            </ChakraLink>
          </Link>
        </Flex>
      </Box>
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
          marginTop={5}
          marginBottom={3}
          padding={5}
          width={375}
          height={560}
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

          <Text fontSize="26px" marginY={2} fontWeight="800">
            {"Login"}
          </Text>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              onSubmit(values);
              actions.setSubmitting(false);
            }}
          >
            {(formProps) => (
              <Form>
                <Flex marginTop={4} marginBottom={6}>
                  <Field name="email">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.email && form.touched.email}
                      >
                        <FormLabel fontWeight="bold" htmlFor="email">
                          {"Email"}
                        </FormLabel>
                        <Input
                          {...field}
                          id="email"
                          type="email"
                          size="lg"
                          height="40px"
                          fontSize="16px"
                          placeholder="Enter email..."
                          background="#F6F6F6"
                          borderRadius={6}
                          _placeholder={{ color: "gray.500" }}
                          _hover={{ background: "#e0e0e0" }}
                        />
                        <Box position="absolute" top="68px" left="2px">
                          <FormErrorMessage fontSize="11px">
                            {form.errors.email}
                          </FormErrorMessage>
                        </Box>
                      </FormControl>
                    )}
                  </Field>
                </Flex>

                <Flex marginTop={6} marginBottom={3}>
                  <Field name="password">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.password && form.touched.password
                        }
                      >
                        <Flex direction="row" justifyContent="space-between">
                          <FormLabel fontWeight="bold" htmlFor="password">
                            {"Password"}
                          </FormLabel>
                          <Link href="/forgot-password">
                            <ChakraLink
                              marginTop="4px"
                              marginRight="2px"
                              fontSize="11px"
                              fontWeight="500"
                            >
                              {"Forgot password?"}
                            </ChakraLink>
                          </Link>
                        </Flex>
                        <Input
                          {...field}
                          id="password"
                          type="password"
                          placeholder="Enter password..."
                          background="#F6F6F6"
                          borderRadius={6}
                          size="lg"
                          height="40px"
                          fontSize="16px"
                          _placeholder={{ color: "gray.500" }}
                          _hover={{ background: "#e0e0e0" }}
                        />
                        <Box position="absolute" top="68px" left="2px">
                          <FormErrorMessage fontSize="11px">
                            {form.errors.password}
                          </FormErrorMessage>
                        </Box>
                      </FormControl>
                    )}
                  </Field>
                </Flex>

                <Fade in={error} out={!error}>
                  <Box marginY={2}>
                    <Alert
                      width="100%"
                      status="error"
                      backgroundColor="transparent"
                      variant="subtle"
                      borderRadius={6}
                      marginY={2}
                      paddingLeft={0}
                      height="30px"
                    >
                      <Flex alignItems="center">
                        <AlertIcon
                          color="red.400"
                          height="15px"
                          marginRight={2}
                          marginTop="1px"
                        />
                        <Text color="red.500" fontWeight="500" fontSize="14px">
                          {error}
                        </Text>
                      </Flex>
                    </Alert>
                  </Box>
                </Fade>

                <Flex marginTop="115px" marginBottom={5}>
                  <Button
                    size="lg"
                    colorScheme="green"
                    width="100%"
                    type="submit"
                    isLoading={formProps.isSubmitting}
                  >
                    {"Submit"}
                  </Button>
                </Flex>
              </Form>
            )}
          </Formik>
        </Flex>
      </Flex>
    </>
  );
};

LoginForm.propTypes = {
  error: PropTypes.string,
  onSubmit: PropTypes.func,
};
LoginForm.defaultProps = {
  error: null,
  onSubmit: () => {},
};

export default LoginForm;
