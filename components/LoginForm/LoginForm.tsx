import React, { FC, useContext } from "react";
import * as Yup from "yup";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  useBreakpointValue,
} from "@chakra-ui/react";

import { Formik, Field, Form } from "formik";

import AuthView from "../AuthView";
import AuthCard from "../AuthCard";
import Logo from "../Logo";

import ErrorAlertBanner from "../ErrorAlertBanner";
import RegisterLink from "./RegisterLink";
import { LoginFormSubmit } from "../../types/login-form-submit";
import { getCsrfToken } from "next-auth/react";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

const initialValues = {
  email: "",
  password: "",
};

interface Props {
  csrfToken?: string;
  error?: string;
  onSubmit?: (values: LoginFormSubmit) => void;
  isSubmitting?: boolean;
}

const LoginForm: FC<Props> = ({
  csrfToken = "",
  error = null,
  onSubmit = () => {},
  isSubmitting = false,
}) => {
  const shouldRenderOnMobile = useBreakpointValue({ base: false, md: true });
  const { t } = useContext(LanguageContext);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required(t.global.emailRequiredValidation)
      .email(t.global.emailValidValidation),
    password: Yup.string()
      .required(t.global.passwordRequiredValidation)
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        t.global.passwordMatchValidation
      ),
  });

  const mainContent = (
    <>
      <Flex
        justifyContent="center"
        marginTop={3}
        marginBottom={5}
        _hover={{ cursor: "pointer" }}
      >
        <Link href="/">
          <Logo height="42px" width="200px" />
        </Link>
      </Flex>

      <Heading as="h1" fontSize="26px" marginY={3} fontWeight="800">
        {t.global.login}
      </Heading>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(): React.ReactNode => (
          <Form>
            <Flex marginTop={4} marginBottom={6}>
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

              <Field name="email">
                {({ field, form }): React.ReactNode => (
                  <FormControl
                    isInvalid={form.errors.email && form.touched.email}
                  >
                    <FormLabel fontWeight="bold" htmlFor="email">
                      {t.global.email}
                    </FormLabel>
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      size="lg"
                      height="40px"
                      fontSize="16px"
                      placeholder={t.global.emailPlaceholder}
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
                {({ field, form }): React.ReactNode => (
                  <FormControl
                    isInvalid={form.errors.password && form.touched.password}
                  >
                    <Flex direction="row" justifyContent="space-between">
                      <FormLabel fontWeight="bold" htmlFor="password">
                        {t.global.password}
                      </FormLabel>
                      <Link
                        href="/forgot-password"
                        marginTop="4px"
                        marginRight="2px"
                        fontSize="11px"
                        fontWeight="500"
                      >
                        {t.loginForm.forgotPassword}
                      </Link>
                    </Flex>
                    <Input
                      {...field}
                      id="password"
                      type="password"
                      placeholder={t.global.passwordPlaceholder}
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

            <Flex marginTop={{ base: "46px", md: "115px" }} marginBottom={1}>
              <Button
                size="lg"
                colorScheme="green"
                width="100%"
                type="submit"
                isLoading={isSubmitting}
              >
                {t.global.login}
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
          <AuthView marginTop={{ base: 6, md: 16 }}>
            <AuthCard marginX="auto" marginTop={5} marginBottom={3} width={375}>
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

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}

export default LoginForm;
