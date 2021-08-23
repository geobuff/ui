import React, { FC } from "react";
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
import AvatarSelect from "../AvatarSelect";
import CountrySelect from "../CountrySelect";
import ErrorAlertBanner from "../ErrorAlertBanner";
import Logo from "../Logo";

import LoginLink from "./LoginLink";

const initialValues = {
  avatarId: "",
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
    .max(30, "Must be less than 30 characters long.")
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
  onSubmit?: any;
  isSubmitting?: boolean;
}

const RegisterForm: FC<Props> = ({ error="", onSubmit=()=>{}, isSubmitting=false }) => {
  const shouldRenderOnMobile = useBreakpointValue({ base: false, md: true });

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
        {() => (
          <Form>
            <Box marginBottom={5}>
              <Flex marginY={6}>
                <Field name="avatarId">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.avatarId && form.touched.avatarId}
                    >
                      <FormLabel htmlFor="avatarId" fontWeight="bold">
                        {"Avatar"}
                      </FormLabel>

                      <AvatarSelect fieldProps={field} />
                      <Box position="absolute" top="68px" left="2px">
                        <FormErrorMessage fontSize="11px">
                          {form.errors.avatarId}
                        </FormErrorMessage>
                      </Box>
                    </FormControl>
                  )}
                </Field>
              </Flex>

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

              <Flex marginTop="44px" marginBottom={0}>
                <Button
                  size="lg"
                  colorScheme="green"
                  width="100%"
                  type="submit"
                  isLoading={isSubmitting}
                >
                  {"Create Account"}
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

          <AuthView marginTop="64px" height="100%">
            <AuthCard
              marginX="auto"
              marginY={5}
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
