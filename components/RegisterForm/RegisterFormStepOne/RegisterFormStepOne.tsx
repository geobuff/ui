import React, { FC, useContext } from "react";

import { GeoBuffLogo } from "@geobuff/buff-ui/components";

import {
  Box,
  Button,
  Fade,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import { Field } from "formik";

import { LanguageContext } from "../../../context/LanguageContext/LanguageContext";

import { RegisterFormSubmit } from "../../../types/register-form-submit";

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
  values = null,
  onCheckEmailValidity = () => {},
  isValidating = false,
}) => {
  const { t } = useContext(LanguageContext);

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
          <GeoBuffLogo height={42} width={200} />
        </Link>
      </Flex>

      <Heading as="h1" fontSize="26px" marginY={2} fontWeight="extrabold">
        {t.registerFormStepOne.title}
      </Heading>
      <Text fontSize="12px" marginY={1} color="gray.500">
        {t.registerFormStepOne.explainer}
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
                  {t.global.email}
                </FormLabel>
                <Input
                  {...field}
                  isDisabled={isValidating}
                  id="email"
                  autoComplete="off"
                  placeholder={t.global.emailPlaceholder}
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
                  {t.global.password}
                </FormLabel>
                <Input
                  {...field}
                  isDisabled={isValidating}
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder={t.global.passwordPlaceholder}
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
        {t.global.next}
      </Button>
    </Fade>
  );
};

export default RegisterFormStepOne;
