import React, { FC } from "react";

import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Link as ChakraLink,
  Input,
  Text,
} from "@chakra-ui/react";
import { Field } from "formik";
import Link from "next/link";
import Logo from "../../Logo";

// export interface Props {}

const RegisterFormStepOne: FC = () => {
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
        <Field name="username">
          {({ field, form }): React.ReactNode => (
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
              <Box position="absolute" top="68px" left="2px">
                <FormErrorMessage
                  fontSize={form.errors.password?.length > 26 ? "10px" : "11px"}
                >
                  {form.errors.password}
                </FormErrorMessage>
              </Box>
            </FormControl>
          )}
        </Field>
      </Flex>
    </Box>
  );
};

export default RegisterFormStepOne;
