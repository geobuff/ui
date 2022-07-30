import React, { FC } from "react";

import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Link,
  Input,
  Text,
  Button,
  Fade,
  Heading,
} from "@chakra-ui/react";
import { Field } from "formik";

import Logo from "../../Logo";
import { RegisterFormSubmit } from "../../../types/register-form-submit";

const welcomeHelperText =
  "Cheers for your interest in signing up! Let's get started by entering your email and password. These will be used to sign you in.";

export interface Props {
  errors: Record<string, string>;
  hasSubmittedOnce: boolean;
  values: RegisterFormSubmit;
  isValidating: boolean;
  onCheckEmailValidity: (email: string) => void;
}

const RegisterFormStepOne: FC<Props> = ({
  hasSubmittedOnce = false,
  errors = {},
  values = {},
  onCheckEmailValidity = () => {},
  isValidating = false,
}) => {
  return (
    <Fade in>
      <Flex
        justifyContent="center"
        marginTop={{ base: 0, md: 3 }}
        marginBottom={8}
        height="100%"
        _hover={{ cursor: "pointer" }}
      >
        <Link href="/">
          <Logo height="42px" width="200px" />
        </Link>
      </Flex>

      <Heading as="h1" fontSize="26px" marginY={2} fontWeight="extrabold">
        {"Create an Account"}
      </Heading>
      <Text fontSize="12px" marginY={1} color="gray.500">
        {welcomeHelperText}
      </Text>
      <Box marginTop={10} marginBottom={16}>
        <Flex marginY={6}>
          <Field name="email">
            {({ field, form }) => (
              <FormControl
                isInvalid={
                  (form.errors.email &&
                    form.touched.email &&
                    !hasSubmittedOnce) ||
                  (form.errors.email && hasSubmittedOnce)
                }
              >
                <FormLabel fontWeight="bold" htmlFor="email">
                  {"Email"}
                </FormLabel>
                <Input
                  {...field}
                  isDisabled={isValidating}
                  id="email"
                  autoComplete="off"
                  placeholder="Enter email..."
                  type="email"
                  size="lg"
                  height="40px"
                  fontSize="16px"
                  background="#F6F6F6"
                  borderRadius={6}
                  _placeholder={{ color: "gray.500" }}
                  _hover={{ background: "#e0e0e0" }}
                  _disabled={{ opacity: 0.2, cursor: "not-allowed" }}
                />
                <FormErrorMessage fontSize="11px">
                  {form.errors.email}
                </FormErrorMessage>
              </FormControl>
            )}
          </Field>
        </Flex>
        <Flex marginY={6}>
          <Field name="password">
            {({ field, form }): React.ReactNode => (
              <FormControl
                isInvalid={form.errors.password && form.touched.password}
              >
                <FormLabel htmlFor="password" fontWeight="bold">
                  {"Password"}
                </FormLabel>
                <Input
                  {...field}
                  isDisabled={isValidating}
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
                  _disabled={{ opacity: 0.2, cursor: "not-allowed" }}
                />
                {form.errors.password && (
                  <FormErrorMessage fontSize="12px">
                    {form.errors.password}
                  </FormErrorMessage>
                )}
              </FormControl>
            )}
          </Field>
        </Flex>
      </Box>
      <Button
        size="lg"
        colorScheme="green"
        width="100%"
        type="button"
        isLoading={isValidating}
        onClick={() =>
          values?.email && !errors?.email && onCheckEmailValidity(values?.email)
        }
      >
        {"Next"}
      </Button>
    </Fade>
  );
};

export default RegisterFormStepOne;
