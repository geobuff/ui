import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  Flex,
  Heading,
} from "@chakra-ui/react";

import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import React, { FC } from "react";
import { SupportFormSubmit } from "../../types/support-form-submit";
import ErrorAlertBanner from "../ErrorAlertBanner";
import Modal from "../Modal";

const validationSchema = Yup.object().shape({
  from: Yup.string()
    .required("Please include your email address.")
    .email("Must be a valid email address."),
  subject: Yup.string().required("Please include a subject."),
  message: Yup.string().required("Please include a message."),
});

interface Props {
  isOpen?: boolean;
  onClose?: () => void;
  onSubmit?: (values: SupportFormSubmit) => void;
  isSubmitting?: boolean;
  error?: string;
  from?: string;
}

const SupportFormModal: FC<Props> = ({
  isOpen = false,
  onClose = (): void => {},
  onSubmit = (values: SupportFormSubmit): void => {},
  isSubmitting = false,
  error = "",
  from = "",
}) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <Formik
      initialValues={{
        from: from,
        subject: "",
        message: "",
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(): React.ReactNode => (
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
                  {"Create Request"}
                </Heading>

                <Flex marginY={3}>
                  <Field name="from">
                    {({ field, form }): React.ReactNode => (
                      <FormControl
                        isInvalid={form.errors.from && form.touched.from}
                      >
                        <FormLabel htmlFor="from" fontWeight="bold">
                          {"From"}
                        </FormLabel>
                        <Input
                          {...field}
                          id="from"
                          type="email"
                          placeholder="Enter your email address..."
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
                            {form.errors.from}
                          </FormErrorMessage>
                        </Box>
                      </FormControl>
                    )}
                  </Field>
                </Flex>

                <Flex marginY={3}>
                  <Field name="subject">
                    {({ field, form }): React.ReactNode => (
                      <FormControl
                        isInvalid={form.errors.subject && form.touched.subject}
                      >
                        <FormLabel htmlFor="subject" fontWeight="bold">
                          {"Subject"}
                        </FormLabel>
                        <Input
                          {...field}
                          id="subject"
                          type="text"
                          placeholder="Enter subject..."
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
                            {form.errors.subject}
                          </FormErrorMessage>
                        </Box>
                      </FormControl>
                    )}
                  </Field>
                </Flex>

                <Flex marginY={3}>
                  <Field name="message">
                    {({ field, form }): React.ReactNode => (
                      <FormControl
                        isInvalid={form.errors.message && form.touched.message}
                      >
                        <FormLabel htmlFor="message" fontWeight="bold">
                          {"Message"}
                        </FormLabel>
                        <Textarea
                          {...field}
                          id="message"
                          type="text"
                          placeholder="Enter message..."
                          size="lg"
                          fontSize="16px"
                          background="#F6F6F6"
                          borderRadius={6}
                          _placeholder={{ color: "gray.500" }}
                          _hover={{ background: "#e0e0e0" }}
                        />
                        <Box position="absolute" top="108px" left="2px">
                          <FormErrorMessage fontSize="11px">
                            {form.errors.message}
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
                    {"Submit"}
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

export default SupportFormModal;
