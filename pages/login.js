import React, { useState } from "react";
import { useRouter } from "next/router";
import { Formik, Field, Form } from "formik";
import jwt_decode from "jwt-decode";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

import axiosClient from "../axios/axiosClient";
import useCurrentUser from "../hooks/UseCurrentUser";

const Login = () => {
  const router = useRouter();
  const { updateUser } = useCurrentUser();

  const [error, setError] = useState(null);

  const login = (email, password) => {
    setError(null);
    const login = { email, password };
    axiosClient
      .post("/auth/login", login)
      .then((response) => {
        const decoded = jwt_decode(response.data);
        const user = {
          id: decoded["userId"],
          username: decoded["username"],
          email: decoded["email"],
          countryCode: decoded["countryCode"],
          xp: decoded["xp"],
          isPremium: decoded["isPremium"],
          token: response.data,
        };
        updateUser(user);
        router.push("/");
      })
      .catch((error) => {
        setError(error.response.data);
      });
  };

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
        onSubmit={(values, actions) => {
          login(values.email, values.password);
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
                  <FormLabel htmlFor="email">Email</FormLabel>
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
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    placeholder="Enter password..."
                  />
                </FormControl>
              )}
            </Field>
            <Button type="submit" isLoading={formProps.isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Login;
