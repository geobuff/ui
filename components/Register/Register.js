import React, { useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";
import { Formik, Field, Form } from "formik";

import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Image,
  Link as ChakraLink,
  Text,
} from "@chakra-ui/react";

import Link from "next/link";

import useCurrentUser from "../../hooks/UseCurrentUser";
import axiosClient from "../../axios/axiosClient";
import CountrySelect from "../CountrySelect/CountrySelect";

const Register = () => {
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
        router.push("/");
      })
      .catch((error) => {
        setError(error.response.data);
      });
  };

  return (
    <Flex
      marginTop={14}
      height="78vh"
      direction="column"
      justifyContent="center"
    >
      <Flex
        backgroundColor="white"
        borderRadius={12}
        boxShadow="0px 4px 4px rgba(179, 187, 209, 0.25)"
        direction="column"
        marginX="auto"
        marginY={5}
        padding={5}
        width={420}
        height={675}
      >
        <Flex
          justifyContent="center"
          marginTop={3}
          marginBottom={5}
          _hover={{ cursor: "pointer" }}
        >
          <Link href="/">
            <ChakraLink>
              <Image src="/logo.svg" height="42px" />
            </ChakraLink>
          </Link>
        </Flex>

        <Text fontSize="26px" marginY={2} fontWeight="800">
          {"Create an Account"}
        </Text>

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
              <Flex marginY={4}>
                <Field name="username">
                  {({ field, form }) => (
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
                        fontSize="16px"
                        background="#F6F6F6"
                        borderRadius={6}
                        _placeholder={{ color: "gray.500" }}
                        _hover={{ background: "#e0e0e0" }}
                      />
                    </FormControl>
                  )}
                </Field>
              </Flex>
              <Flex marginY={4}>
                <Field name="email">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.email && form.touched.email}
                    >
                      <FormLabel htmlFor="email" fontWeight="bold">
                        {"Email"}
                      </FormLabel>
                      <Input
                        {...field}
                        id="email"
                        type="email"
                        size="lg"
                        placeholder="Enter email..."
                        fontSize="16px"
                        background="#F6F6F6"
                        borderRadius={6}
                        _placeholder={{ color: "gray.500" }}
                        _hover={{ background: "#e0e0e0" }}
                      />
                    </FormControl>
                  )}
                </Field>
              </Flex>

              <Flex marginY={4}>
                <Field name="password">
                  {({ field, form }) => (
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
                        fontSize="16px"
                        background="#F6F6F6"
                        borderRadius={6}
                        _placeholder={{ color: "gray.500" }}
                        _hover={{ background: "#e0e0e0" }}
                      />
                    </FormControl>
                  )}
                </Field>
              </Flex>
              <Flex marginY={4}>
                <Field name="countryCode">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.errors.countryCode && form.touched.countryCode
                      }
                    >
                      <FormLabel htmlFor="countryCode" fontWeight="bold">
                        {"Country"}
                      </FormLabel>

                      <CountrySelect fieldProps={field} />
                    </FormControl>
                  )}
                </Field>
              </Flex>

              <Flex marginTop="85px" marginBottom={0}>
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

Register.propTypes = {
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      svgName: PropTypes.string,
      code: PropTypes.string,
    })
  ),
};

export default Register;
