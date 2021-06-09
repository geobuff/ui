import React from "react";
import PropTypes from "prop-types";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Button,
  FormErrorMessage,
  Heading,
} from "@chakra-ui/react";

import Modal from "../Modal";
import AvatarSelect from "../AvatarSelect";
import CountrySelect from "../CountrySelect";
import ErrorAlertBanner from "../ErrorAlertBanner";

const validationSchema = Yup.object().shape({
  avatarId: Yup.number().required("Please select an avatar."),
  username: Yup.string()
    .required("Please include a username.")
    .min(3, "Must be at least 3 characters long.")
    .max(30, "Must be less than 30 characters long.")
    .matches(/^\S*$/, "Cannot contain spaces."),
  email: Yup.string()
    .required("Please include an email.")
    .email("Must be a valid email address."),
});

const UpdateUserFormModal = ({
  isOpen,
  onClose,
  user,
  onSubmit,
  isSubmitting,
  error,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Formik
        enableReinitialize
        initialValues={{
          avatarId: user?.avatarId,
          username: user?.username,
          email: user?.email,
          countryCode: user?.countryCode,
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {() => (
          <Form style={{ height: "100%" }}>
            <Box height="100%">
              <Flex
                direction="column"
                justifyContent="space-between"
                height="100%"
              >
                <Flex direction="column" marginX={6}>
                  <Heading
                    marginTop={6}
                    marginBottom={4}
                    fontSize="32px"
                    fontWeight="bold"
                  >
                    {"Update Profile"}
                  </Heading>

                  <Flex marginY={6}>
                    <Field name="avatarId">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.avatarId && form.touched.avatarId
                          }
                        >
                          <FormLabel htmlFor="avatarId" fontWeight="bold">
                            {"Avatar"}
                          </FormLabel>

                          <AvatarSelect fieldProps={field} />
                          <Box position="absolute" top="68px" left="2px">
                            <FormErrorMessage fontSize="11px">
                              {form.errors.avatarId}
                            </FormErrorMessage>
                          </Box>
                        </FormControl>
                      )}
                    </Field>
                  </Flex>

                  <Flex marginY={3}>
                    <Field name="username">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.username && form.touched.username
                          }
                        >
                          <FormLabel fontWeight="bold" htmlFor="username">
                            {"Username"}
                          </FormLabel>
                          <Input
                            {...field}
                            id="username"
                            autoComplete="off"
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

                  <Flex marginY={3}>
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
                            height="40px"
                            fontSize="16px"
                            background="#F6F6F6"
                            borderRadius={6}
                            _placeholder={{ color: "gray.500" }}
                            _hover={{ background: "#e0e0e0" }}
                          />
                          <Box position="absolute" top="68px" left="2px">
                            <FormErrorMessage fontSize="11px">
                              {form.errors.email}
                            </FormErrorMessage>
                          </Box>
                        </FormControl>
                      )}
                    </Field>
                  </Flex>

                  <Flex marginY={3}>
                    <Field name="countryCode">
                      {({ field, form }) => (
                        <FormControl>
                          <FormLabel htmlFor="countryCode" fontWeight="bold">
                            {"Country"}
                          </FormLabel>
                          <CountrySelect fieldProps={field} />
                          <Box position="absolute" top="68px" left="2px">
                            <FormErrorMessage fontSize="11px">
                              {form.errors.countryCode}
                            </FormErrorMessage>
                          </Box>
                        </FormControl>
                      )}
                    </Field>
                  </Flex>
                </Flex>

                <Flex justifyContent="flex-end">
                  <Flex
                    direction="row"
                    marginTop="44px"
                    marginBottom={6}
                    marginRight={6}
                  >
                    <Button marginRight={3} width="100%" onClick={onClose}>
                      {"Cancel"}
                    </Button>
                    <Button
                      colorScheme="green"
                      width="100%"
                      type="submit"
                      isLoading={isSubmitting}
                    >
                      {"Update"}
                    </Button>
                    <ErrorAlertBanner error={error} />
                  </Flex>
                </Flex>
              </Flex>
            </Box>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

UpdateUserFormModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  user: PropTypes.shape({
    id: PropTypes.number,
    avatarId: PropTypes.number,
    username: PropTypes.string,
    email: PropTypes.string,
    countryCode: PropTypes.string,
    xp: PropTypes.number,
    picture: PropTypes.string,
  }),
  onSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
  error: PropTypes.string,
};

UpdateUserFormModal.defaultProps = {
  isOpen: false,
  onClose: () => {},
  user: null,
  onSubmit: () => {},
  isSubmitting: false,
  error: "",
};

export default UpdateUserFormModal;
