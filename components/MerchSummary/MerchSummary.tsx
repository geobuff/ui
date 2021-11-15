import React, { FC, useState } from "react";
import Link from "next/link";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Select,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import Image from "../Image";
import Modal from "../Modal";
import { MerchItem } from "../../types/merch-item";
import { MerchSummaryFormSubmit } from "../../types/merch-summary-form-submit";
import MapInteractionCSS from "../MapInteractionCSS";

const validationSchema = Yup.object().shape({
  size: Yup.string().required("Please choose an available size."),
});

interface Props {
  item?: MerchItem;
  isSubmitting?: boolean;
  onSubmit?: (values: MerchSummaryFormSubmit) => void;
  submitted?: boolean;
}

const MerchSummary: FC<Props> = ({
  item = null,
  isSubmitting = false,
  onSubmit = (values: MerchSummaryFormSubmit): void => {},
  submitted = false,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentImage, setCurrentImage] = useState(
    item?.images.find((x) => x.isPrimary).imageUrl
  );

  return (
    <>
      <Flex
        background="white"
        direction={{ base: "column", lg: "row" }}
        width="100%"
        justifyContent="center"
        padding={12}
      >
        <Flex justifyContent="center">
          <Flex direction="column">
            <MapInteractionCSS background="#F0F0F0" borderRadius="12px">
              <Image
                src={currentImage}
                width="500px"
                height="auto"
                borderRadius="12px"
              />
            </MapInteractionCSS>
            <SimpleGrid mt={6} columns={{ base: 3, md: 4 }} spacingY={6}>
              {item?.images.map((image) => (
                <Image
                  key={image.id}
                  src={image.imageUrl}
                  onClick={(): void => setCurrentImage(image.imageUrl)}
                  width="100px"
                  height="auto"
                  borderRadius="12px"
                  cursor="pointer"
                />
              ))}
            </SimpleGrid>
          </Flex>
        </Flex>
        <Flex
          direction="column"
          width={{ base: "100%", lg: "40%" }}
          px={{ base: 0, lg: 12 }}
          mt={{ base: 12, lg: 0 }}
        >
          <Heading>{item?.name}</Heading>
          <Text mt={3}>{`$${item?.price.Float64}`}</Text>
          <Text mt={3}>{item?.description}</Text>
          <Formik
            initialValues={{
              size: "",
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(): React.ReactNode => (
              <Form>
                <Flex
                  direction={{ base: "column", xl: "row" }}
                  justifyContent={{ base: "center", xl: "space-between" }}
                  marginY={6}
                >
                  <Flex minWidth={item?.sizeGuideImageUrl.Valid && "65%"}>
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
                  <Flex
                    direction="column"
                    justifyContent="center"
                    mt={{ base: 9, xl: 0 }}
                  >
                    <Button onClick={onOpen}>Size Guide</Button>
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
              <Button width="100%" mt={3}>
                View Cart
              </Button>
            </Link>
          )}
        </Flex>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} header="Size Guide" hasCloseIcon>
        <Flex justifyContent="center" margin={6}>
          <Image
            src={item?.sizeGuideImageUrl.String}
            alt="Size Guide"
            width="100%"
            height="auto"
          />
        </Flex>
      </Modal>
    </>
  );
};

export default MerchSummary;
