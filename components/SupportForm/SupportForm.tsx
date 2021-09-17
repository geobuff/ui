import {
  Text,
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";

import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import React, { FC } from "react";
import { SupportFormSubmit } from "../../types/support-form-submit";

const initialValues: SupportFormSubmit = {
  from: "",
  subject: "",
  message: "",
};

const validationSchema = Yup.object().shape({
  from: Yup.string()
    .required("Please include your email address.")
    .email("Must be a valid email address."),
  subject: Yup.string().required("Please include a subject."),
  message: Yup.string().required("Please include a message."),
});

interface Props {
  isSubmitting?: boolean;
  submitted?: boolean;
  error?: boolean;
  onSubmit?: (values: SupportFormSubmit) => void;
}

const SupportForm: FC<Props> = ({
  isSubmitting = false,
  submitted = false,
  error = false,
  onSubmit = (values: SupportFormSubmit): void => {},
}) => (
  <>
    {error && (
      <Alert status="error" borderRadius={6} mt={6}>
        <AlertIcon />
        We&apos;ve encountered an error while sending your request. Please
        manually send your message to teamgeobuff@gmail.com.
      </Alert>
    )}
    {submitted ? (
      <Alert status="success" borderRadius={6} mt={6}>
        <AlertIcon />
        Your request has successfully been sent to support.
      </Alert>
    ) : (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions): void => {
          onSubmit(values);
          actions.setSubmitting(false);
        }}
      >
        {(): React.ReactNode => (
          <Form>
            <Field name="from">
              {({ field, form }): React.ReactNode => (
                <FormControl
                  marginY={6}
                  isInvalid={form.errors.from && form.touched.from}
                >
                  <FormLabel htmlFor="from" hidden>
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
                  <Box position="absolute" top="38px" left="2px">
                    <FormErrorMessage fontSize="11px">
                      {form.errors.from}
                    </FormErrorMessage>
                  </Box>
                </FormControl>
              )}
            </Field>

            <Field name="subject">
              {({ field, form }): React.ReactNode => (
                <FormControl
                  marginY={6}
                  isInvalid={form.errors.subject && form.touched.subject}
                >
                  <FormLabel htmlFor="subject" hidden>
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
                  <Box position="absolute" top="38px" left="2px">
                    <FormErrorMessage fontSize="11px">
                      {form.errors.subject}
                    </FormErrorMessage>
                  </Box>
                </FormControl>
              )}
            </Field>

            <Field name="message">
              {({ field, form }): React.ReactNode => (
                <FormControl
                  marginY={6}
                  isInvalid={form.errors.message && form.touched.message}
                >
                  <FormLabel htmlFor="message" hidden>
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
                  <Box position="absolute" top="74px" left="2px">
                    <FormErrorMessage fontSize="11px">
                      {form.errors.message}
                    </FormErrorMessage>
                  </Box>
                </FormControl>
              )}
            </Field>

            <Button colorScheme="green" type="submit" isLoading={isSubmitting}>
              {"Submit"}
            </Button>
          </Form>
        )}
      </Formik>
    )}
  </>
);

export default SupportForm;
