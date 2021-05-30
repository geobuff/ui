import React from "react";
import PropTypes from "prop-types";
import { Formik, Field, Form } from "formik";

import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Divider,
  Flex,
  Button,
  Avatar,
  FormErrorMessage,
  Checkbox,
} from "@chakra-ui/react";

import CountrySelect from "../CountrySelect";
import ErrorAlertBanner from "../ErrorAlertBanner";

import Card from "../Card";

const UserProfileSummary = ({
  user,
  onSubmit,
  isSubmitting,
  error,
  createCheckoutSession,
  manageSubscription,
}) => (
  <Card>
    <Box mb={6}>
      <ErrorAlertBanner error={error} />
      <Box textAlign="center">
        <Avatar
          height="60px"
          width="60px"
          src={user?.picture}
          name={user.username}
          mt={2}
          mb={6}
        />
      </Box>
      <Divider />
      <Formik
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
            <Flex marginY={6}>
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

            <Flex marginY={6}>
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

            <Flex marginY={6}>
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

            <Flex marginY={6}>
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
                <Button onClick={createCheckoutSession}>Upgrade</Button>
              ) : (
                <Button onClick={manageSubscription}>Manage</Button>
              )}
            </Flex>

            <Flex marginTop="44px" marginBottom={0}>
              <Button
                size="lg"
                colorScheme="green"
                width="100%"
                type="submit"
                isLoading={isSubmitting}
              >
                {"Update"}
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  </Card>
);

UserProfileSummary.propTypes = {
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
  createCheckoutSession: PropTypes.func,
  manageSubscription: PropTypes.func,
};

UserProfileSummary.defaultProps = {
  user: {},
  onSubmit: () => {},
  isSubmitting: false,
  error: "",
  createCheckoutSession: () => {},
  manageSubscription: () => {},
};

export default UserProfileSummary;
