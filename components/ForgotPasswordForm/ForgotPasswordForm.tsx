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

import ForgotPasswordSuccess from "./ForgotPasswordSuccess";
import AuthView from "../AuthView";
import AuthCard from "../AuthCard";
import Logo from "../Logo";
import { ForgotPasswordFormSubmit } from "../../types/forgot-password-form-submit";
import ArrowLeft from "../../Icons/ArrowLeft";
import { useRouter } from "next/router";

const forgotPasswordExplainer =
  "Enter the email address you used when you joined and we’ll send you a link to reset your password.";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Please include an email."),
});

interface Props {
  error?: string;
  isSuccess?: boolean;
  isLoading?: boolean;
  isSubmitting?: boolean;
  onSubmit?: (values: ForgotPasswordFormSubmit) => void;
}

const ForgotPasswordForm: FC<Props> = ({
  error = "",
  isSuccess = false,
  isLoading = false,
  isSubmitting = false,
  onSubmit = (values: ForgotPasswordFormSubmit): void => {},
}) => {
  const router = useRouter();
  const shouldRenderOnMobile = useBreakpointValue({ base: false, md: true });

  const success = (
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
      <Box marginY={2}>
        <ForgotPasswordSuccess />
      </Box>
    </>
  );

  const mainContent = (
    <>
      <Flex mt={-2} ml={-4} mb={6}>
        <Button
          alignItems="center"
          backgroundColor="transparent"
          _hover={{
            textDecoration: "underline",
            cursor: "pointer",
          }}
          onClick={() => router.push("/login")}
        >
          <ArrowLeft height={5} width={5} marginRight={1} />
          <Text fontWeight="bold" fontSize="14px">
            {"Back to Login"}
          </Text>
        </Button>
      </Flex>
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
        {"Forgotten Password"}
      </Text>

      <Text marginTop={2} color="gray.600" fontSize="14px">
        {forgotPasswordExplainer}
      </Text>

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
                    {"Email"}
                  </FormLabel>

                  <Input
                    {...field}
                    id="email"
                    type="email"
                    placeholder="Enter email..."
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
                {"Reset"}
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </>
  );

  return (
    <>
      {shouldRenderOnMobile ? (
        <>
          <AuthView>
            <AuthCard
              height={isSuccess ? 260 : 478}
              width={375}
              marginX="auto"
              marginY={5}
            >
              {isSuccess ? success : mainContent}
            </AuthCard>
          </AuthView>
        </>
      ) : (
        <Flex direction="column" padding={5}>
          {isSuccess ? success : mainContent}
        </Flex>
      )}
    </>
  );
};

export default ForgotPasswordForm;
