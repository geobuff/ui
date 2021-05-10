import React from "react";
import PropTypes from "prop-types";

import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Image,
  Link as ChakraLink,
  Text,
  Fade,
} from "@chakra-ui/react";
import Link from "next/link";

import { Formik, Field, Form } from "formik";

const Login = ({ error, onSubmit }) => {
  return (
    <Flex height="90vh" direction="column" justifyContent="center">
      <Flex
        backgroundColor="white"
        borderRadius={12}
        boxShadow="0px 4px 4px rgba(179, 187, 209, 0.25)"
        direction="column"
        marginX="auto"
        marginY={5}
        padding={5}
        width={375}
        height={520}
      >
        <Flex justifyContent="center" marginY={5}>
          <Image src="/logo.svg" height="36px" />
        </Flex>

        <Text fontSize="26px" marginY={2} fontWeight="800">
          {"Login"}
        </Text>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(values, actions) => {
            onSubmit(values);
            actions.setSubmitting(false);
          }}
        >
          {(formProps) => (
            <Form>
              <Flex marginTop={4} marginBottom={6}>
                <Field name="email">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.email && form.touched.email}
                    >
                      <FormLabel fontWeight="bold" htmlFor="email">
                        {"Email"}
                      </FormLabel>
                      <Input
                        {...field}
                        id="email"
                        type="email"
                        size="lg"
                        fontSize="16px"
                        placeholder="Enter email..."
                        background="#F6F6F6"
                        borderRadius={6}
                        _placeholder={{ color: "gray.500" }}
                        _hover={{ background: "#e0e0e0" }}
                      />
                    </FormControl>
                  )}
                </Field>
              </Flex>

              <Flex marginTop={6} marginBottom={3}>
                <Field name="password">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.password && form.touched.password}
                    >
                      <FormLabel fontWeight="bold" htmlFor="password">
                        {"Password"}
                      </FormLabel>
                      <Input
                        {...field}
                        id="password"
                        type="password"
                        placeholder="Enter password..."
                        background="#F6F6F6"
                        borderRadius={6}
                        size="lg"
                        fontSize="16px"
                        _placeholder={{ color: "gray.500" }}
                        _hover={{ background: "#e0e0e0" }}
                      />
                    </FormControl>
                  )}
                </Field>
              </Flex>

              <Flex direction="column" marginLeft="2px">
                <Link href="/forgot-password">
                  <ChakraLink fontSize="14px" fontWeight="500">
                    {"Forgot password?"}
                  </ChakraLink>
                </Link>
              </Flex>

              <Fade in={error} out={!error}>
                <Box marginY={2}>
                  <Alert
                    width="100%"
                    status="error"
                    backgroundColor="transparent"
                    variant="subtle"
                    borderRadius={6}
                    marginY={2}
                    paddingLeft={0}
                  >
                    <AlertIcon color="red.400" />
                    <Text color="red.500" fontWeight="500">
                      {error}
                    </Text>
                  </Alert>
                </Box>
              </Fade>

              <Flex marginTop="20px" marginBottom={5}>
                <Button
                  size="lg"
                  colorScheme="green"
                  width="100%"
                  type="submit"
                  isLoading={formProps.isSubmitting}
                >
                  {"Submit"}
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Flex>
    </Flex>
  );
};

Login.propTypes = {
  error: PropTypes.string,
  onSubmit: PropTypes.func,
};
Login.defaultProps = {
  error: null,
  onSubmit: () => {},
};

export default Login;
