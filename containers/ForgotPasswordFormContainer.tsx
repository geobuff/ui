import React, { FC, useContext } from "react";

import { ForgotPasswordForm } from "@geobuff/buff-ui/components";

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
  Input,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";

import { LanguageContext } from "../context/LanguageContext/LanguageContext";

import { ForgotPasswordFormSubmit } from "../types/forgot-password-form-submit";

interface Props {
  error?: string;
  isSuccess?: boolean;
  isLoading?: boolean;
  isSubmitting?: boolean;
  onSubmit?: (values: ForgotPasswordFormSubmit) => void;
}

export const ForgotPasswordFormContainer: FC<Props> = ({
  error = "",
  isSuccess = false,
  isLoading = false,
  isSubmitting = false,
  onSubmit = (values: ForgotPasswordFormSubmit): void => {},
}) => {
  const router = useRouter();
  const shouldRenderOnMobile = useBreakpointValue({ base: false, md: true });
  const { t } = useContext(LanguageContext);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required(t.validations.emailRequired)
      .email(t.validations.emailValid),
  });

  const form = (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, actions): void => {
        onSubmit(values);
        actions.setSubmitting(false);
      }}
    >
      {(): React.ReactNode => (
        <Form>
          <Field name="email">
            {({ field, form }): React.ReactNode => (
              <FormControl
                marginY={6}
                isInvalid={form.errors.email && form.touched.email}
              >
                <FormLabel htmlFor="email" hidden>
                  {t.global.email}
                </FormLabel>

                <Input
                  {...field}
                  id="email"
                  type="email"
                  placeholder={t.global.emailPlaceholder}
                  size="lg"
                  fontSize="16px"
                  background="#F6F6F6"
                  borderRadius={6}
                  _placeholder={{ color: "gray.500" }}
                  _hover={{ background: "#e0e0e0" }}
                />

                <Box position="absolute" top="38px" left="2px">
                  <FormErrorMessage fontSize="11px">
                    {form.errors.email}
                  </FormErrorMessage>
                </Box>
              </FormControl>
            )}
          </Field>

          <Fade in={!!error}>
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
              isLoading={isSubmitting}
              disabled={isLoading}
            >
              {t.global.reset}
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );

  return (
    <ForgotPasswordForm
      shouldRenderOnMobile={shouldRenderOnMobile}
      isSuccess={isSuccess}
      successMessage={t.forgotPasswordForm.successMessage}
      backToLoginText={t.forgotPasswordForm.backToLogin}
      heading={t.forgotPassword.title}
      explainer={t.forgotPasswordForm.explainer}
      onBackToLoginClick={() => router.push("/login")}
    >
      {form}
    </ForgotPasswordForm>
  );
};
