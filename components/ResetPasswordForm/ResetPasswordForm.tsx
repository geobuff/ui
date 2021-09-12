import React, { FC } from "react";
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
  Input,
  Link as ChakraLink,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";

import Link from "next/link";

import AuthView from "../AuthView";
import AuthCard from "../AuthCard";
import Logo from "../Logo";

import ResetPasswordError from "./ResetPasswordError";
import ResetPasswordSuccess from "./ResetPasswordSuccess";
import { ResetPasswordFormReset } from "../../types/reset-password-form-submit";

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

interface Props {
  error?: string;
  isSuccess?: boolean;
  isSubmitting?: boolean;
  onSubmit?: (values: ResetPasswordFormReset) => void;
}

const ResetPasswordForm: FC<Props> = ({
  error = "",
  isSuccess = false,
  isSubmitting = false,
  onSubmit = (values: ResetPasswordFormReset): void => {},
}) => {
  const shouldRenderOnMobile = useBreakpointValue({ base: false, md: true });

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
              >
                {"Reset"}
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </>
  );

  const getViewComponent = (): React.ReactNode => {
    if (error) {
      return <ResetPasswordError error={error} />;
    }

    if (isSuccess) {
      return (
        <Box marginY={2}>
          <ResetPasswordSuccess />
        </Box>
      );
    }

    return form;
  };

  return (
    <>
      {shouldRenderOnMobile ? (
        <AuthView>
          <AuthCard
            marginX="auto"
            marginY={5}
            height={isSuccess || error ? 280 : 422}
          >
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

            {getViewComponent()}
          </AuthCard>
        </AuthView>
      ) : (
        <Flex direction="column" padding={5} marginBottom={4}>
          <Link href="/">
            <ChakraLink>
              <Logo height="42px" width="200px" />
            </ChakraLink>
          </Link>
          {getViewComponent()}
        </Flex>
      )}
    </>
  );
};

export default ResetPasswordForm;