import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Formik, Field, Form } from "formik";
import {
  Box,
  Alert,
  FormControl,
  FormLabel,
  Input,
  Button,
  AlertIcon,
  Link as ChakraLink,
} from "@chakra-ui/react";

import axiosClient from "../../../axios/axiosClient";

const ResetPassword = () => {
  const router = useRouter();
  const { userId, token } = router.query;

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (userId && token) {
      axiosClient
        .get(`/auth/reset-token-valid/${userId}/${token}`)
        .then((response) => {
          if (!response.data) {
            setError(
              "Invalid reset token. Please request another token and try again."
            );
          }
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error.response.data);
          setIsLoading(false);
        });
    }
  }, [userId, token]);

  const submit = (password) => {
    setError(null);
    const payload = { userId: parseInt(userId), token, password };
    axiosClient
      .put("/auth", payload)
      .then(() => {
        setSuccess(true);
      })
      .catch((error) => {
        setError(error.response.data);
      });
  };

  if (isLoading) {
    return null;
  }

  return (
    <Box>
      {error && (
        <Alert status="error" borderRadius={6}>
          <AlertIcon />
          {error}
        </Alert>
      )}
      {success ? (
        <Alert status="success" borderRadius={6}>
          <AlertIcon />
          Successfully updated password. Please{" "}
          <Link href="/login">
            <ChakraLink>login</ChakraLink>
          </Link>{" "}
          to continue.
        </Alert>
      ) : (
        <Formik
          initialValues={{
            password: "",
          }}
          onSubmit={(values, actions) => {
            submit(values.password);
            actions.setSubmitting(false);
          }}
        >
          {(formProps) => (
            <Form>
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
              <Button
                type="submit"
                isLoading={formProps.isSubmitting}
                disabled={error}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </Box>
  );
};

export default ResetPassword;
