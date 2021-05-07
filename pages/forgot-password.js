import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
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
import MainView from "../components/MainView";
import useCurrentUser from "../hooks/UseCurrentUser";
import Head from "next/head";

const ForgotPassword = () => {
  const router = useRouter();
  const { user, isLoading: isLoadingUser } = useCurrentUser();

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isLoadingUser && user) {
      router.push("/");
    }
  }, [isLoadingUser, user, router]);

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

  if (isLoadingUser || user) {
    return null;
  }

  return (
    <MainView>
      <Head>
        <title>Forgot Password - GeoBuff</title>
      </Head>
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
    </MainView>
  );
};

export default ForgotPassword;
