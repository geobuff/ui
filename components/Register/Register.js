import React, { useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";
import { Formik, Field, Form } from "formik";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

import useCurrentUser from "../../hooks/UseCurrentUser";
import axiosClient from "../../axios/axiosClient";

const Register = ({ countries }) => {
  const router = useRouter();
  const { updateUser } = useCurrentUser();

  const [error, setError] = useState(null);

  const register = (username, email, countryCode, password) => {
    setError(null);
    const register = { username, email, countryCode, password };
    axiosClient
      .post("/auth/register", register)
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

        if (router.query.data) {
          const data = JSON.parse(router.query.data);
          router.push({
            pathname: data.redirect,
            query: {
              data: JSON.stringify({
                tempScoreId: data.tempScoreId,
              }),
            },
          });
        } else {
          router.push("/");
        }
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
          username: "",
          email: "",
          countryCode: "",
          password: "",
        }}
        onSubmit={(values, actions) => {
          register(
            values.username,
            values.email,
            values.countryCode,
            values.password
          );
          actions.setSubmitting(false);
        }}
      >
        {(formProps) => (
          <Form>
            <Field name="username">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.username && form.touched.username}
                >
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <Input
                    {...field}
                    id="username"
                    placeholder="Enter username..."
                  />
                </FormControl>
              )}
            </Field>
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
            <Field name="countryCode">
              {({ field, form }) => (
                <FormControl
                  isInvalid={
                    form.errors.countryCode && form.touched.countryCode
                  }
                >
                  <FormLabel htmlFor="countryCode">Country</FormLabel>
                  <Select {...field} id="countryCode">
                    <option value="" disabled>
                      Please select a country...
                    </option>
                    {countries.map((x) => (
                      <option key={x.code} value={x.code}>
                        {x.svgName}
                      </option>
                    ))}
                  </Select>
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

Register.propTypes = {
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      svgName: PropTypes.string,
      code: PropTypes.string,
    })
  ),
};

export default Register;
