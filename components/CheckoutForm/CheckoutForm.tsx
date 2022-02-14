import React, { FC } from "react";
import * as Yup from "yup";

import {
  Text,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Box,
  FormErrorMessage,
  Heading,
  Divider,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";

import PlacesAutocomplete from "react-places-autocomplete";
import ArrowLeft from "../../Icons/ArrowLeft";
import Card from "../Card";
import { useRouter } from "next/router";
import { Field, Form, Formik } from "formik";
import { CheckoutFormSubmit } from "../../types/checkout-form-submit";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Please include your email address.")
    .email("Must be a valid email address."),
  firstName: Yup.string().required("Please include your first name."),
  lastName: Yup.string().required("Please include your last name."),
  address: Yup.string().required("Please include your street address."),
});

const divider = <Divider borderColor="#E3E1E1" borderWidth={1} my={2} />;

const searchOptions = {
  componentRestrictions: { country: ["nz"] },
};

export interface Props {
  email?: string;
  isLoading?: boolean;
  onSubmit?: (values: CheckoutFormSubmit) => void;
}

const CheckoutForm: FC<Props> = ({
  email = "",
  isLoading = false,
  onSubmit = (values: CheckoutFormSubmit): void => {},
}) => {
  const router = useRouter();

  const renderAddressInput = ({
    getInputProps,
    getSuggestionItemProps,
    suggestions,
    loading,
  }) => (
    <>
      <Input
        {...getInputProps()}
        id="address"
        type="text"
        placeholder="Enter your street address..."
        size="lg"
        fontSize="16px"
        fontWeight={400}
        background="#F6F6F6"
        borderRadius={6}
        _placeholder={{ color: "gray.500" }}
        _hover={{ background: "#e0e0e0" }}
      />
      <>
        {loading && (
          <Box>
            <Text>Loading...</Text>
          </Box>
        )}
        {suggestions.map((suggestion, index) => (
          <Box
            {...getSuggestionItemProps(suggestion)}
            key={index}
            background={suggestion.active ? "red" : "#ffffff"}
            cursor="pointer"
            border="1px #E3E1E1 solid"
            padding={3}
            borderRadius={6}
          >
            <Text>{suggestion.description}</Text>
          </Box>
        ))}
      </>
    </>
  );

  return (
    <Flex
      direction="column"
      maxWidth={{ base: "100%", md: "50%" }}
      marginX="auto"
      marginBottom={14}
      marginTop={{ base: 3, sm: 10, md: 14 }}
      paddingX={3}
      width="100%"
    >
      <Flex mb={3}>
        <Button
          alignItems="center"
          backgroundColor="transparent"
          marginTop={2}
          marginLeft={2}
          _hover={{
            textDecoration: "underline",
            cursor: "pointer",
          }}
          onClick={() => router.push("/shopping-cart")}
        >
          <ArrowLeft height={5} width={5} marginRight={1} />
          <Text fontWeight="bold" fontSize="14px">
            {"Back To Cart"}
          </Text>
        </Button>
      </Flex>
      <Card>
        <Formik
          initialValues={{
            email: email,
            firstName: "",
            lastName: "",
            address: "",
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values, setFieldValue }): React.ReactNode => (
            <Form>
              <Flex direction="column" marginX={{ base: 1, md: 6 }}>
                <Heading size="md" mt={{ base: 1, md: 6 }} mb={3}>
                  {"Delivery Method"}
                </Heading>
                <Flex marginY={6}>
                  <RadioGroup value={"0"}>
                    <Radio value="0">
                      <Box ml={3}>
                        <Text fontWeight="bold">
                          {"NZ-wide standard shipping"}
                        </Text>
                        <Text>{"$5 - Expect delivery in 5-7 days"}</Text>
                      </Box>
                    </Radio>
                  </RadioGroup>
                </Flex>

                {divider}

                <Heading size="md" mt={6} mb={3}>
                  Contact Details
                </Heading>
                <Flex mt={3} mb={6}>
                  <Field name="email">
                    {({ field, form }): React.ReactNode => (
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
                          placeholder="Enter your email address..."
                          size="lg"
                          fontSize="16px"
                          fontWeight={400}
                          background="#F6F6F6"
                          borderRadius={6}
                          disabled={!!email}
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

                {divider}

                <Heading size="md" mt={6} mb={3}>
                  Delivery Details
                </Heading>
                <Flex marginY={3}>
                  <Field name="firstName">
                    {({ field, form }): React.ReactNode => (
                      <FormControl
                        isInvalid={
                          form.errors.firstName && form.touched.firstName
                        }
                      >
                        <FormLabel htmlFor="firstName" fontWeight="bold">
                          {"First Name"}
                        </FormLabel>
                        <Input
                          {...field}
                          id="firstName"
                          type="text"
                          placeholder="Enter your first name..."
                          size="lg"
                          fontSize="16px"
                          fontWeight={400}
                          background="#F6F6F6"
                          borderRadius={6}
                          _placeholder={{ color: "gray.500" }}
                          _hover={{ background: "#e0e0e0" }}
                        />
                        <Box position="absolute" top="68px" left="2px">
                          <FormErrorMessage fontSize="11px">
                            {form.errors.firstName}
                          </FormErrorMessage>
                        </Box>
                      </FormControl>
                    )}
                  </Field>
                </Flex>

                <Flex marginY={3}>
                  <Field name="lastName">
                    {({ field, form }): React.ReactNode => (
                      <FormControl
                        isInvalid={
                          form.errors.lastName && form.touched.lastName
                        }
                      >
                        <FormLabel htmlFor="lastName" fontWeight="bold">
                          {"Last Name"}
                        </FormLabel>
                        <Input
                          {...field}
                          id="lastName"
                          type="text"
                          placeholder="Enter your last name..."
                          size="lg"
                          fontSize="16px"
                          fontWeight={400}
                          background="#F6F6F6"
                          borderRadius={6}
                          _placeholder={{ color: "gray.500" }}
                          _hover={{ background: "#e0e0e0" }}
                        />
                        <Box position="absolute" top="68px" left="2px">
                          <FormErrorMessage fontSize="11px">
                            {form.errors.lastName}
                          </FormErrorMessage>
                        </Box>
                      </FormControl>
                    )}
                  </Field>
                </Flex>

                <Flex marginY={3}>
                  <Field name="address">
                    {({ form }): React.ReactNode => (
                      <FormControl
                        isInvalid={form.errors.address && form.touched.address}
                      >
                        <FormLabel htmlFor="address" fontWeight="bold">
                          {"Address"}
                        </FormLabel>
                        <PlacesAutocomplete
                          value={values.address}
                          onChange={(value) => setFieldValue("address", value)}
                          searchOptions={searchOptions}
                        >
                          {renderAddressInput}
                        </PlacesAutocomplete>
                        <Box position="absolute" top="68px" left="2px">
                          <FormErrorMessage fontSize="11px">
                            {form.errors.address}
                          </FormErrorMessage>
                        </Box>
                      </FormControl>
                    )}
                  </Field>
                </Flex>

                <Flex justifyContent="flex-end">
                  <Flex
                    direction="row"
                    marginTop="44px"
                    marginBottom={6}
                    marginRight={{ base: 0, md: 6 }}
                  >
                    <Button
                      colorScheme="teal"
                      width="100%"
                      type="submit"
                      isLoading={isLoading}
                      disabled={isLoading}
                    >
                      {"Continue To Payment"}
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
            </Form>
          )}
        </Formik>
      </Card>
    </Flex>
  );
};

export default CheckoutForm;
