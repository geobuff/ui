import React, { FC, useContext } from "react";

import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { Field, FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";

import { LanguageContext } from "../../contexts/LanguageContext";

import { FlagsFormSubmit } from "../../types/flags-form-submit";
import { MappingsWithoutFlagsDto } from "../../types/mappings-without-flags-dto";

export interface Props {
  availableMappings?: MappingsWithoutFlagsDto[];
  isLoading?: boolean;
  onSubmit?: (values: FlagsFormSubmit) => void;
  onClose?: () => void;
  isSubmitting?: boolean;
}

const CreateFlagsForm: FC<Props> = ({
  availableMappings = [],
  isLoading = false,
  onSubmit = () => {},
  onClose = () => {},
  isSubmitting = false,
}) => {
  const { t } = useContext(LanguageContext);

  const validationSchema = Yup.object().shape({
    label: Yup.string().required(t.validations.flagGroupLabelRequired),
    key: Yup.string().required(t.validations.mappingKeyRequired),
    entries: Yup.array().of(
      Yup.object().shape({
        code: Yup.string().required(t.validations.flagEntryCodeRequired),
        url: Yup.string().required(t.validations.flagEntryUrlRequired),
      })
    ),
  });

  return (
    <Formik
      initialValues={{
        key: "",
        label: "",
        entries: [],
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <Flex my={3}>
            <Field name="label">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.label && form.touched.label}
                >
                  <FormLabel htmlFor="label" fontWeight="bold">
                    {"Label"}
                  </FormLabel>
                  <Input
                    {...field}
                    id={`label`}
                    type="text"
                    placeholder="Enter label..."
                    size="lg"
                    fontSize="16px"
                    fontWeight={400}
                    background="#F6F6F6"
                    borderRadius={6}
                    _placeholder={{ color: "gray.500" }}
                    _hover={{ background: "#e0e0e0" }}
                  />
                  <FormErrorMessage fontSize="11px">
                    {form.errors.label}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
          </Flex>

          <Flex my={3}>
            <Field name="key">
              {({ form }) => (
                <FormControl isInvalid={form.errors.key && form.touched.key}>
                  <FormLabel htmlFor="key" fontWeight="bold">
                    {"Key"}
                  </FormLabel>
                  <Select
                    onChange={(e) => {
                      const key = e.target.value;
                      setFieldValue("key", key);
                      const mapping = availableMappings.find(
                        (x) => x.key === key
                      );

                      setFieldValue("entries", mapping ? mapping.entries : []);
                    }}
                  >
                    <option>{"Select a key..."}</option>
                    {availableMappings.map((mapping, index) => (
                      <option key={index} value={mapping.key}>
                        {mapping.key}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage fontSize="11px">
                    {form.errors.key}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
          </Flex>

          {values.key && (
            <Flex direction="column" mt={6}>
              <FormLabel htmlFor="entries" fontWeight="bold">
                {"Entries"}
              </FormLabel>
              <FieldArray
                name="entries"
                render={() => (
                  <div>
                    {values.entries &&
                      values.entries.map((_, index) => (
                        <Flex justifyContent="space-between" key={index} mb={3}>
                          <Field name={`entries.${index}.code`}>
                            {({ field }) => (
                              <FormControl>
                                <Input
                                  {...field}
                                  id={`entries.${index}.code`}
                                  type="text"
                                  placeholder="Enter code..."
                                  size="lg"
                                  fontSize="16px"
                                  fontWeight={400}
                                  background="#F6F6F6"
                                  borderRadius={6}
                                  _placeholder={{ color: "gray.500" }}
                                  _hover={{ background: "#e0e0e0" }}
                                  maxW={250}
                                />
                              </FormControl>
                            )}
                          </Field>
                          <Field name={`entries.${index}.url`} key={index}>
                            {({ field }) => (
                              <FormControl>
                                <Input
                                  {...field}
                                  id={`entries.${index}.url`}
                                  type="text"
                                  placeholder="Enter url..."
                                  size="lg"
                                  fontSize="16px"
                                  fontWeight={400}
                                  background="#F6F6F6"
                                  borderRadius={6}
                                  _placeholder={{ color: "gray.500" }}
                                  _hover={{ background: "#e0e0e0" }}
                                  maxW={250}
                                />
                              </FormControl>
                            )}
                          </Field>
                        </Flex>
                      ))}
                  </div>
                )}
              />
            </Flex>
          )}

          <Flex mt={6} justifyContent="right">
            <Button onClick={onClose} mr={3}>
              Cancel
            </Button>
            <Button
              type="submit"
              colorScheme="teal"
              disabled={isLoading || isSubmitting}
            >
              Create
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

export default CreateFlagsForm;
