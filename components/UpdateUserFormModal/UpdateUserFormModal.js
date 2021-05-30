import React from "react";
import PropTypes from "prop-types";
import { Formik, Field, Form } from "formik";

import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Button,
  FormErrorMessage,
  Checkbox,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Heading,
} from "@chakra-ui/react";

import CountrySelect from "../CountrySelect";
import ErrorAlertBanner from "../ErrorAlertBanner";

const UpdateUserFormModal = ({
  isOpen,
  onClose,
  user,
  onSubmit,
  isSubmitting,
  error,
  onClickUpgrade,
  onClickManage,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <Formik
        enableReinitialize
        initialValues={{
          username: user.username,
          email: user.email,
          countryCode: user.countryCode,
          isPremium: user.isPremium,
        }}
        onSubmit={onSubmit}
      >
        {() => (
          <Form>
            <ModalContent borderRadius="12px">
              <ModalBody padding={0}>
                <Flex direction="column" marginX={6}>
                  <Heading
                    marginTop={6}
                    marginBottom={4}
                    fontSize="32px"
                    fontWeight="bold"
                  >
                    {"Update Profile"}
                  </Heading>
                  <Flex marginY={3}>
                    <Field name="username">
                      {({ field }) => (
                        <FormControl>
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
                            disabled
                          />
                        </FormControl>
                      )}
                    </Field>
                  </Flex>

                  <Flex marginY={3}>
                    <Field name="email">
                      {({ field }) => (
                        <FormControl>
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
                            disabled
                          />
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

                  <Flex marginY={3}>
                    <Field name="isPremium">
                      {({ field, form }) => (
                        <FormControl>
                          <Checkbox
                            {...field}
                            id="isPremium"
                            size="lg"
                            isChecked={form.values.isPremium}
                            isDisabled
                          >
                            {"Premium"}
                          </Checkbox>
                        </FormControl>
                      )}
                    </Field>
                    {!user.isPremium ? (
                      <Button onClick={onClickUpgrade}>{"Upgrade"}</Button>
                    ) : (
                      <Button onClick={onClickManage}>{"Manage"}</Button>
                    )}
                  </Flex>
                </Flex>
              </ModalBody>
              <ModalFooter marginBottom={1}>
                <Flex marginTop="44px" marginBottom={0}>
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
              </ModalFooter>
            </ModalContent>
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
    username: PropTypes.string,
    email: PropTypes.string,
    countryCode: PropTypes.string,
    xp: PropTypes.number,
    isPremium: PropTypes.bool,
    picture: PropTypes.string,
  }),
  onSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
  error: PropTypes.string,
  onClickUpgrade: PropTypes.func,
  onClickManage: PropTypes.func,
};

UpdateUserFormModal.defaultProps = {
  isOpen: false,
  onClose: () => {},
  user: {},
  onSubmit: () => {},
  isSubmitting: false,
  error: "",
  onClickUpgrade: () => {},
  onClickManage: () => {},
};

export default UpdateUserFormModal;
