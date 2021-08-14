import React from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link as ChakraLink,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

import Link from "next/link";

import { Formik, Field, Form } from "formik";

import AuthView from "../AuthView";
import AuthCard from "../AuthCard";
import Logo from "../Logo";

import ErrorAlertBanner from "../ErrorAlertBanner";
import RegisterLink from "./RegisterLink";

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
      "Must contain at least 8 characters, one uppercase letter, one lowercase letter and one number."
    ),
});

const LoginForm = ({ error, onSubmit, isSubmitting }) => {
  const shouldRenderOnMobile = useBreakpointValue({ base: false, md: true });

  const mainContent = (
    <>
      <Flex
        justifyContent="center"
        marginTop={3}
        marginBottom={5}
        _hover={{ cursor: "pointer" }}
      >
        <Link href="/">
          <ChakraLink>
            <Logo height="42px" width="200px" />
          </ChakraLink>
        </Link>
      </Flex>

      <Text fontSize="26px" marginY={2} fontWeight="800">
        {"Login"}
      </Text>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {() => (
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
                    isInvalid={form.errors.password && form.touched.password}
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

            <Flex marginTop={{ base: "46px", md: "115px" }} marginBottom={5}>
              <Button
                size="lg"
                colorScheme="green"
                width="100%"
                type="submit"
                isLoading={isSubmitting}
              >
                {"Submit"}
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </>
  );

  return (
    <>
      <ErrorAlertBanner error={error} />
      {shouldRenderOnMobile ? (
        <>
          <Box position="absolute" top={0} right={0}>
            <RegisterLink />
          </Box>
          <AuthView>
            <AuthCard
              marginX="auto"
              marginTop={5}
              marginBottom={3}
              width={375}
              height={560}
            >
              {mainContent}
            </AuthCard>
          </AuthView>
        </>
      ) : (
        <Flex direction="column" padding={5}>
          {mainContent}
          <RegisterLink />
        </Flex>
      )}
    </>
  );
};

LoginForm.propTypes = {
  error: PropTypes.string,
  onSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
};
LoginForm.defaultProps = {
  error: null,
  onSubmit: () => {},
  isSubmitting: false,
};

export default LoginForm;
