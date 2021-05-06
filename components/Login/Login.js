import React from "react";
import PropTypes from "prop-types";

import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
  Link as ChakraLink,
} from "@chakra-ui/react";
import Link from "next/link";

import { Formik, Field, Form } from "formik";

const Login = ({ error, onSubmit }) => {
  return (
    <Box maxWidth="50%" mx="auto">
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
        onSubmit={onSubmit}
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
                  />
                </FormControl>
              )}
            </Field>
            <Link href="/forgot-password">
              <ChakraLink>{"Forgot password?"}</ChakraLink>
            </Link>
            <Button type="submit" isLoading={formProps.isSubmitting}>
              {"Submit"}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
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
