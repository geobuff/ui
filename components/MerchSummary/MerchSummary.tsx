import React, { FC } from "react";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Select,
  Text,
} from "@chakra-ui/react";

import Image from "../Image";
import { MerchItem } from "../../types/merch-item";
import { MerchSummaryFormSubmit } from "../../types/merch-summary-form-submit";

const validationSchema = Yup.object().shape({
  size: Yup.string().required("Please choose an available size."),
});

interface Props {
  item?: MerchItem;
  isSubmitting?: boolean;
  onSubmit?: (values: MerchSummaryFormSubmit) => void;
}

const MerchSummary: FC<Props> = ({
  item = null,
  isSubmitting = false,
  onSubmit = (values: MerchSummaryFormSubmit): void => {},
}) => (
  <Flex
    background="white"
    direction={{ base: "column", md: "row" }}
    width="100%"
    justifyContent="center"
    padding={12}
  >
    <Flex direction="column">
      <Image
        src={item?.images.find((x) => x.isPrimary).imageUrl}
        width="500px"
        height="auto"
        borderRadius="12px"
      />
      <Flex mt={6}>
        {item?.images.map((image) => (
          <Image
            key={image.id}
            src={image.imageUrl}
            width="100px"
            height="auto"
            borderRadius="12px"
          />
        ))}
      </Flex>
    </Flex>
    <Flex
      direction="column"
      width={{ base: "100%", md: "40%" }}
      px={{ base: 0, md: 12 }}
      mt={{ base: 12, md: 0 }}
    >
      <Heading>{item?.name}</Heading>
      <Text mt={3}>{`$${item?.price.Float64}`}</Text>
      <Accordion defaultIndex={[0]} allowMultiple mt={6}>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                {"Description"}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>{item?.description}</AccordionPanel>
        </AccordionItem>
        {item?.sizeGuideImageUrl.Valid && (
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  {"Size Guide"}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Flex justifyContent="center">
                <Image
                  src={item?.sizeGuideImageUrl.String}
                  alt="Size Guide"
                  width="100%"
                  height="auto"
                />
              </Flex>
            </AccordionPanel>
          </AccordionItem>
        )}
      </Accordion>
      <Formik
        initialValues={{
          size: "",
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(): React.ReactNode => (
          <Form>
            <Flex marginY={6}>
              <Field name="size">
                {({ field, form }): React.ReactNode => (
                  <FormControl
                    isInvalid={form.errors.size && form.touched.size}
                  >
                    <Select {...field}>
                      <option value="" disabled>
                        Select a size...
                      </option>
                      {item?.sizes.map((size) => (
                        <option key={size.id} value={size.id}>
                          {size.size}
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
    </Flex>
  </Flex>
);

export default MerchSummary;
