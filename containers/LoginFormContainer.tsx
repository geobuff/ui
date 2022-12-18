import React, { FC, useContext } from "react";

import { LoginForm } from "@geobuff/buff-ui/components";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { getCsrfToken } from "next-auth/react";
import * as Yup from "yup";

import { LanguageContext } from "../contexts/LanguageContext";

import { LoginFormSubmit } from "../types/login-form-submit";

const initialValues = {
  email: "",
  password: "",
};

interface Props {
  csrfToken?: string;
  onSubmit?: (values: LoginFormSubmit) => void;
  isSubmitting?: boolean;
}

export const LoginFormContainer: FC<Props> = ({
  csrfToken = "",
  onSubmit = () => {},
  isSubmitting = false,
}) => {
  const shouldRenderOnMobile = useBreakpointValue({ base: false, md: true });
  const { t } = useContext(LanguageContext);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required(t.validations.emailRequired)
      .email(t.validations.emailValid),
    password: Yup.string()
      .required(t.validations.passwordRequired)
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        t.validations.passwordMatch
      ),
  });

  const form = (
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
  );

  return (
    <LoginForm
      shouldRenderOnMobile={shouldRenderOnMobile}
      heading={t.global.login}
      linkMessage={t.registerLink.message}
      linkAction={t.registerLink.action}
      linkHref="/register"
    >
      {form}
    </LoginForm>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
