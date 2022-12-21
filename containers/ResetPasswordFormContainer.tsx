import React, { FC, useContext } from "react";

import { ResetPasswordForm } from "@geobuff/buff-ui/components";

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
import * as Yup from "yup";

import { LanguageContext } from "../contexts/LanguageContext";

import { ResetPasswordFormReset } from "../types/reset-password-form-submit";

interface Props {
  error?: string;
  isSuccess?: boolean;
  isLoading?: boolean;
  isSubmitting?: boolean;
  onSubmit?: (values: ResetPasswordFormReset) => void;
}

export const ResetPasswordFormContainer: FC<Props> = ({
  error = "",
  isSuccess = false,
  isLoading = false,
  isSubmitting = false,
  onSubmit = (values: ResetPasswordFormReset): void => {},
}) => {
  const { t } = useContext(LanguageContext);
  const shouldRenderOnMobile = useBreakpointValue({ base: false, md: true });

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required(t.validations.passwordRequired)
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        t.validations.passwordMatch
      ),
  });

  const form = (
    <Formik
      initialValues={{ password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, actions): void => {
        onSubmit(values);
        actions.setSubmitting(false);
      }}
    >
      {(): React.ReactNode => (
        <Form>
          <Field name="password">
            {({ field, form }): React.ReactNode => (
              <FormControl
                marginY={6}
                isInvalid={form.errors.password && form.touched.password}
              >
                <FormLabel htmlFor="password" hidden>
                  {t.global.password}
                </FormLabel>
                <Input
                  {...field}
                  id="password"
                  type="password"
                  placeholder={t.resetPasswordForm.passwordPlaceholder}
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
    <ResetPasswordForm
      shouldRenderOnMobile={shouldRenderOnMobile}
      error={error}
      isSuccess={isSuccess}
      heading={t.resetPasswordForm.title}
      explainer={t.resetPasswordForm.explainer}
      successHeading={t.resetPasswordSuccess.title}
      descriptionOne={t.resetPasswordSuccess.descriptionOne}
      action={t.resetPasswordSuccess.link}
      descriptionTwo={t.resetPasswordSuccess.descriptionTwo}
      href="/login"
    >
      {form}
    </ResetPasswordForm>
  );
};
