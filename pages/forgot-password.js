import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
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

const ForgotPassword = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const submit = (email) => {
    setError(null);
    const payload = { email };
    axiosClient
      .post("/auth/send-reset-token", payload)
      .then(() => {
        setSuccess(true);
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
      {success ? (
        <Alert status="success" borderRadius={6}>
          <AlertIcon />
          Successfully sent password reset link. Please check your email.
        </Alert>
      ) : (
        <Formik
          initialValues={{
            email: "",
          }}
          onSubmit={(values, actions) => {
            submit(values.email);
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
              <Button type="submit" isLoading={formProps.isSubmitting}>
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </Box>
  );
};

export default ForgotPassword;
