import React from "react";
import PropTypes from "prop-types";

import {
  FormControl,
  FormLabel,
  Input,
  Image,
  Button,
  Alert,
  AlertIcon,
  Link as ChakraLink,
  Flex,
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
        width={400}
        height={600}
      >
        <Flex justifyContent="center" marginY={5}>
          <Image src="/logo.svg" height="36px" />
        </Flex>
        {error && (
          <Alert status="error" borderRadius={6}>
            <AlertIcon />
            {error}
          </Alert>
        )}
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
              <Field name="email">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.email && form.touched.email}
                  >
                    <FormLabel htmlFor="email">{"Email"}</FormLabel>
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      placeholder="Enter email..."
                      background="#F6F6F6"
                      borderRadius={6}
                      height="40px"
                      _placeholder={{ color: "gray.500" }}
                      _hover={{ background: "#e0e0e0" }}
                    />
                  </FormControl>
                )}
              </Field>
              <Field name="password">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.password && form.touched.password}
                  >
                    <FormLabel htmlFor="password">{"Password"}</FormLabel>
                    <Input
                      {...field}
                      id="password"
                      type="password"
                      placeholder="Enter password..."
                      background="#F6F6F6"
                      borderRadius={6}
                      height="40px"
                      _placeholder={{ color: "gray.500" }}
                      _hover={{ background: "#e0e0e0" }}
                    />
                  </FormControl>
                )}
              </Field>

              <Flex direction="column" marginY={3}>
                <Link href="/forgot-password">
                  <ChakraLink>{"Forgot password?"}</ChakraLink>
                </Link>
              </Flex>

              <Flex marginTop={10} marginBottom={5}>
                <Button colorScheme="green" width="100%" type="submit">
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
