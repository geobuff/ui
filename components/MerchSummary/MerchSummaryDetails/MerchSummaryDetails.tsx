import React, { FC } from "react";
import {
  Box,
  Heading,
  Text,
  Flex,
  FormControl,
  Select,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { MerchSize } from "../../../types/merch-item";
import { MerchSummaryFormSubmit } from "../../../types/merch-summary-form-submit";

const validationSchema = Yup.object().shape({
  size: Yup.string().required("Please choose an available size."),
});

export interface Props {
  name?: string;
  price?: number;
  description?: string;
  sizeGuideImageUrl?: string;
  sizes?: MerchSize[];
  isAvailable?: (sizeId: number) => boolean;
  onSubmit?: (values: MerchSummaryFormSubmit) => void;
  isSubmitting?: boolean;
  submitted?: boolean;
  onOpen?: () => void;
}

const MerchSummaryDetails: FC<Props> = ({
  name = "",
  price = 0,
  description = "",
  sizeGuideImageUrl = "",
  sizes = [],
  isAvailable = (sizeId: number): boolean => false,
  onSubmit = (values: MerchSummaryFormSubmit): void => {},
  isSubmitting = false,
  submitted = false,
  onOpen = (): void => {},
}) => {
  return (
    <>
      <Heading>{name}</Heading>
      <Text mt={1} color="gray.500" fontSize="xl">{`$${price}`}</Text>
      <Text mt={3}>{description}</Text>
      <Formik
        initialValues={{
          size: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          onSubmit(values);
          resetForm();
        }}
      >
        {(): React.ReactNode => (
          <Form>
            <Flex
              direction={{ base: "column", xl: "row" }}
              justifyContent={{ base: "center", xl: "space-between" }}
              marginY={6}
            >
              <Flex minWidth="100%" marginRight={4} marginTop={2}>
                <Field name="size">
                  {({ field, form }): React.ReactNode => (
                    <FormControl
                      isInvalid={form.errors.size && form.touched.size}
                    >
                      <Select {...field}>
                        <option value="" disabled>
                          Select a size...
                        </option>
                        {sizes.map((size) => (
                          <option
                            key={size.id}
                            value={size.id}
                            disabled={
                              size.quantity === 0 || !isAvailable(size.id)
                            }
                          >
                            {size.size}{" "}
                            {(size.quantity === 0 || !isAvailable(size.id)) &&
                              " - Sold Out"}
                          </option>
                        ))}
                      </Select>
                      <Box position="absolute" top="38px" left="2px">
                        <FormErrorMessage fontSize="11px">
                          {form.errors.size}
                        </FormErrorMessage>
                      </Box>
                    </FormControl>
                  )}
                </Field>
                {sizeGuideImageUrl && (
                  <Flex direction="column" justifyContent="center">
                    <Button onClick={onOpen} marginLeft={3}>
                      {"Size Guide"}
                    </Button>
                  </Flex>
                )}
              </Flex>
            </Flex>

            <Button
              colorScheme="green"
              width="100%"
              type="submit"
              isLoading={isSubmitting}
              mt={3}
            >
              {"Add To Cart"}
            </Button>
          </Form>
        )}
      </Formik>
      {submitted && (
        <Link href="/shopping-cart">
          <Button colorScheme="teal" width="100%" mt={3}>
            {" View Cart"}
          </Button>
        </Link>
      )}
    </>
  );
};

export default MerchSummaryDetails;
