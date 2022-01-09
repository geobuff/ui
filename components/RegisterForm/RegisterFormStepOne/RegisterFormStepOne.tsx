import React, { FC } from "react";
import { debounce } from "throttle-debounce";

import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Link as ChakraLink,
  Input,
  Text,
  InputGroup,
  InputRightElement,
  Spinner,
  Button,
} from "@chakra-ui/react";
import { Field } from "formik";
import Link from "next/link";
import Logo from "../../Logo";

export interface Props {
  values: any; // TODO: Add type
  isValidating: boolean;
  isValidEmail: boolean;
  onCheckEmailValidity: (email: string) => void;
}

const RegisterFormStepOne: FC<Props> = ({
  values = {},
  onCheckEmailValidity = () => {},
  isValidating = false,
  isValidEmail = true,
}) => {
  return (
    <Box>
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
      <Flex marginY={6}>
        <Field name="email">
          {({ field, form }): React.ReactNode => (
            <FormControl isInvalid={form.errors.email}>
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
              />

              <FormErrorMessage fontSize="11px">
                {form.errors.email}
              </FormErrorMessage>

              {!isValidEmail && (
                <Box fontSize="11px">
                  {`Account with email ${form.values.email} already exists.`}
                </Box>
              )}
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
              {form.errors.password && (
                <FormErrorMessage fontSize="12px">
                  {form.errors.password}
                </FormErrorMessage>
              )}
            </FormControl>
          )}
        </Field>
      </Flex>
      <Button
        size="lg"
        colorScheme="green"
        width="100%"
        type="button"
        isLoading={isValidating}
        onClick={() => onCheckEmailValidity(values.email)}
      >
        {"Next"}
      </Button>
    </Box>
  );
};

export default RegisterFormStepOne;
