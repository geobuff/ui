import React from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";

import {
  Button,
  Box,
  Collapse,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Image,
  Link as ChakraLink,
  Text,
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";

import Link from "next/link";

import CountrySelect from "../CountrySelect";

const initialValues = {
  username: "",
  email: "",
  countryCode: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Please include a username."),
  countryCode: Yup.string().required("Please include a country."),
  email: Yup.string().required("Please include an email."),
  password: Yup.string()
    .required("Please include a password.")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      "Must contain at least 8 characters, least one uppercase letter, one lowercase letter and one number."
    ),
});

const RegisterForm = ({ error, onSubmit }) => (
  <>
    <Collapse
      in={error}
      animateOpacity
      unmountOnExit
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        zIndex: 10,
      }}
    >
      <Box p={1} backgroundColor="red.500" color="white">
        <Text fontWeight={700} fontSize={14} textAlign="center">
          {error}
        </Text>
      </Box>
    </Collapse>

    <Box position="absolute" top={0} right={0}>
      <Flex direction="row" margin={{ sm: 3, md: 5 }}>
        <Text fontSize="14px" marginRight={1} fontWeight="500">
          {"Already signed up?"}
        </Text>
        <Link href="/login">
          <ChakraLink
            fontSize="14px"
            fontWeight="500"
            textDecoration="underline"
            _hover={{
              color: "#5c5c5c",
            }}
          >
            {"Login to your account"}
          </ChakraLink>
        </Link>
      </Flex>
    </Box>

    <Flex
      marginTop={16}
      height="78vh"
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
        maxWidth={420}
        minWidth={{ base: "100%", sm: 420 }}
        zIndex={2}
      >
        <Flex
          justifyContent="center"
          marginTop={3}
          marginBottom={5}
          _hover={{ cursor: "pointer" }}
        >
          <Link href="/">
            <ChakraLink>
              <Image src="/logo.svg" height="42px" />
            </ChakraLink>
          </Link>
        </Flex>

        <Text fontSize="26px" marginY={1} fontWeight="800">
          {"Create an Account"}
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
              <Flex marginY={6}>
                <Field name="username">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.username && form.touched.username}
                    >
                      <FormLabel fontWeight="bold" htmlFor="username">
                        {"Username"}
                      </FormLabel>
                      <Input
                        {...field}
                        id="username"
                        autoComplete="off"
                        placeholder="Enter username..."
                        type="text"
                        size="lg"
                        height="40px"
                        fontSize="16px"
                        background="#F6F6F6"
                        borderRadius={6}
                        _placeholder={{ color: "gray.500" }}
                        _hover={{ background: "#e0e0e0" }}
                      />
                      <Box position="absolute" top="68px" left="2px">
                        <FormErrorMessage fontSize="11px">
                          {form.errors.username}
                        </FormErrorMessage>
                      </Box>
                    </FormControl>
                  )}
                </Field>
              </Flex>

              <Flex marginY={6}>
                <Field name="countryCode">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.errors.countryCode && form.touched.countryCode
                      }
                    >
                      <FormLabel htmlFor="countryCode" fontWeight="bold">
                        {"Country"}
                      </FormLabel>

                      <CountrySelect fieldProps={field} />
                      <Box position="absolute" top="68px" left="2px">
                        <FormErrorMessage fontSize="11px">
                          {form.errors.countryCode}
                        </FormErrorMessage>
                      </Box>
                    </FormControl>
                  )}
                </Field>
              </Flex>

              <Flex marginY={6}>
                <Field name="email">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.email && form.touched.email}
                    >
                      <FormLabel htmlFor="email" fontWeight="bold">
                        {"Email"}
                      </FormLabel>
                      <Input
                        {...field}
                        id="email"
                        type="email"
                        size="lg"
                        placeholder="Enter email..."
                        height="40px"
                        fontSize="16px"
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

              <Flex marginY={6}>
                <Field name="password">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.password && form.touched.password}
                    >
                      <FormLabel htmlFor="password" fontWeight="bold">
                        {"Password"}
                      </FormLabel>
                      <Input
                        {...field}
                        id="password"
                        type="password"
                        autoComplete="new-password"
                        placeholder="Enter password..."
                        size="lg"
                        height="40px"
                        fontSize="16px"
                        background="#F6F6F6"
                        borderRadius={6}
                        _placeholder={{ color: "gray.500" }}
                        _hover={{ background: "#e0e0e0" }}
                      />
                      <Box position="absolute" top="68px" left="2px">
                        <FormErrorMessage
                          fontSize={
                            form.errors.password?.length > 26 ? "10px" : "11px"
                          }
                        >
                          {form.errors.password}
                        </FormErrorMessage>
                      </Box>
                    </FormControl>
                  )}
                </Field>
              </Flex>

              <Flex marginTop="56px" marginBottom={0}>
                <Button
                  size="lg"
                  colorScheme="green"
                  width="100%"
                  type="submit"
                  isLoading={formProps.isSubmitting}
                >
                  {"Create Account"}
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Flex>
    </Flex>
  </>
);

RegisterForm.propTypes = {
  error: PropTypes.string,
  onSubmit: PropTypes.func,
};

RegisterForm.defaultProps = {
  error: "",
  onSubmit: () => {},
};

export default RegisterForm;
