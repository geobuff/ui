import React, { FC, useContext, useEffect, useRef } from "react";

import { ArrowLeft } from "@geobuff/buff-ui/components";

import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Heading,
  Input,
  Spinner,
  Text,
  useRadioGroup,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import PlacesAutocomplete from "react-places-autocomplete";
import * as Yup from "yup";

import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

import { CheckoutFormSubmit } from "../../types/checkout-form-submit";
import { ShippingOption } from "../../types/shipping-option";
import Card from "../Card";
import RadioButton from "../RadioButton";

const divider = <Divider borderColor="#E3E1E1" borderWidth={1} my={2} />;

const searchOptions = {
  componentRestrictions: { country: ["nz"] },
};

export interface Props {
  email?: string;
  shippingOptions?: ShippingOption[];
  isLoading?: boolean;
  isMapsApiLoading?: boolean;
  onSubmit?: (values: CheckoutFormSubmit) => void;
}

const CheckoutForm: FC<Props> = ({
  email = "",
  shippingOptions = [],
  isLoading = false,
  isMapsApiLoading = true,
  onSubmit = (values: CheckoutFormSubmit): void => {},
}) => {
  const { t } = useContext(LanguageContext);
  const router = useRouter();
  const innerRef = useRef(null);

  const validationSchema = Yup.object().shape({
    shippingId: Yup.string().required(t.validations.shippingRequired),
    email: Yup.string()
      .required(t.validations.yourEmailValid)
      .email(t.validations.emailValid),
    firstName: Yup.string().required(t.validations.firstNameRequired),
    lastName: Yup.string().required(t.validations.lastNameRequired),
    address: Yup.string().required(t.validations.addressRequired),
  });

  useEffect(() => {
    if (innerRef) {
      innerRef.current.scrollIntoView();
    }
  }, [innerRef]);

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
        placeholder={t.checkoutForm.addressPlaceholder}
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
            <Text>{t.global.loading}</Text>
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
      ref={innerRef}
      direction="column"
      maxWidth={800}
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
            {t.checkoutForm.backToCart}
          </Text>
        </Button>
      </Flex>
      <Card>
        <Formik
          initialValues={{
            shippingId: "1",
            email: email,
            firstName: "",
            lastName: "",
            address: "",
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values, setFieldValue }): React.ReactNode => {
            const { getRootProps, getRadioProps } = useRadioGroup({
              name: "shippingId",
              defaultValue: "1",
              value: values.shippingId,
              onChange: (value: string) => setFieldValue("shippingId", value),
            });

            const radioGroup = getRootProps();

            return (
              <Form>
                <Flex direction="column" marginX={{ base: 1, md: 6 }}>
                  <Heading size="md" mt={{ base: 1, md: 6 }} mb={3}>
                    {t.checkoutForm.deliveryMethod}
                  </Heading>
                  <Flex marginY={6}>
                    <Field name="shippingId">
                      {({ form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.shippingId && form.touched.shippingId
                          }
                        >
                          <HStack spacing={3} {...radioGroup}>
                            {shippingOptions.map((option) => {
                              const radio = getRadioProps({
                                value: option.id.toString(),
                              });
                              return (
                                <RadioButton
                                  key={option.id}
                                  radioProps={radio}
                                  color="teal"
                                >
                                  <Text fontWeight="bold">{option.name}</Text>
                                  <Text>{`$${option.price} - ${option.description}`}</Text>
                                </RadioButton>
                              );
                            })}
                          </HStack>
                        </FormControl>
                      )}
                    </Field>
                  </Flex>

                  {divider}

                  <Heading size="md" mt={6} mb={3}>
                    {t.checkoutForm.contactDetails}
                  </Heading>
                  <Flex mt={3} mb={6}>
                    <Field name="email">
                      {({ field, form }): React.ReactNode => (
                        <FormControl
                          isInvalid={form.errors.email && form.touched.email}
                        >
                          <FormLabel htmlFor="email" fontWeight="bold">
                            {t.global.email}
                          </FormLabel>
                          <Input
                            {...field}
                            id="email"
                            type="email"
                            placeholder={t.checkoutForm.emailPlaceholder}
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
                    {t.checkoutForm.deliveryDetails}
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
                            {t.checkoutForm.firstNameLabel}
                          </FormLabel>
                          <Input
                            {...field}
                            id="firstName"
                            type="text"
                            placeholder={t.checkoutForm.firstNamePlaceholder}
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
                            {t.checkoutForm.lastNameLabel}
                          </FormLabel>
                          <Input
                            {...field}
                            id="lastName"
                            type="text"
                            placeholder={t.checkoutForm.lastNamePlaceholder}
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
                          isInvalid={
                            form.errors.address && form.touched.address
                          }
                        >
                          <FormLabel htmlFor="address" fontWeight="bold">
                            {t.checkoutForm.addressLabel}
                          </FormLabel>
                          <FormHelperText lineHeight="1.50" mb={2}>
                            {t.checkoutForm.addressHelperText}
                          </FormHelperText>
                          {isMapsApiLoading ? (
                            <Spinner mt={3} />
                          ) : (
                            <PlacesAutocomplete
                              value={values.address}
                              onChange={(value) =>
                                setFieldValue("address", value)
                              }
                              searchOptions={searchOptions}
                            >
                              {renderAddressInput}
                            </PlacesAutocomplete>
                          )}
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
                        {t.checkoutForm.continueToPayment}
                      </Button>
                    </Flex>
                  </Flex>
                </Flex>
              </Form>
            );
          }}
        </Formik>
      </Card>
    </Flex>
  );
};

export default CheckoutForm;
