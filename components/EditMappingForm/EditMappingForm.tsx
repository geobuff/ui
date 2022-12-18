import React, { FC, useContext } from "react";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { Field, FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";

import { LanguageContext } from "../../contexts/LanguageContext";

import { EditMappingGroupSubmit } from "../../types/edit-mapping-group-submit";
import { FieldArrayErrorMessage } from "../FieldArrayErrorMessage/FieldArrayErrorMessage";

export interface Props {
  values: EditMappingGroupSubmit;
  isSubmitting: boolean;
  onSubmit: (values: EditMappingGroupSubmit) => void;
  onClose: () => void;
}

export const EditMappingForm: FC<Props> = ({
  values = null,
  isSubmitting = false,
  onSubmit = () => {},
  onClose = () => {},
}) => {
  const { t } = useContext(LanguageContext);

  const validationSchema = Yup.object().shape({
    label: Yup.string().required(t.validations.mappingLabelRequired),
    entries: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required(t.validations.mappingEntryNameRequired),
        code: Yup.string().required(t.validations.mappingEntryCodeRequired),
        svgName: Yup.string().required(
          t.validations.mappingEntrySVGNameRequired
        ),
      })
    ),
  });

  return (
    <Formik
      initialValues={values}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ values }) => (
        <Form>
          <Flex width={500}>
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
                    id="label"
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

          <Flex direction="column" mt={6}>
            <FormLabel htmlFor="entries" fontWeight="bold">
              {"Mappings"}
            </FormLabel>
            <FieldArray
              name="entries"
              render={() => (
                <div>
                  {values.entries &&
                    values.entries.length > 0 &&
                    values.entries.map((_, index) => (
                      <Flex key={index} mb={3}>
                        <VStack>
                          <Flex>
                            <Field name={`entries.${index}.name`}>
                              {({ field }) => (
                                <FormControl mr={3}>
                                  <Input
                                    {...field}
                                    id={`entries.${index}.name`}
                                    type="text"
                                    size="lg"
                                    fontSize="16px"
                                    fontWeight={400}
                                    background="#F6F6F6"
                                    borderRadius={6}
                                    _placeholder={{ color: "gray.500" }}
                                    _hover={{ background: "#e0e0e0" }}
                                    width={150}
                                  />
                                </FormControl>
                              )}
                            </Field>
                            <Field name={`entries.${index}.code`}>
                              {({ field }) => (
                                <FormControl mr={3}>
                                  <Input
                                    {...field}
                                    id={`entries.${index}.code`}
                                    type="text"
                                    size="lg"
                                    fontSize="16px"
                                    fontWeight={400}
                                    background="#F6F6F6"
                                    borderRadius={6}
                                    _placeholder={{ color: "gray.500" }}
                                    _hover={{ background: "#e0e0e0" }}
                                    width={75}
                                  />
                                </FormControl>
                              )}
                            </Field>
                            <Field name={`entries.${index}.svgName`}>
                              {({ field }) => (
                                <FormControl mr={3}>
                                  <Input
                                    {...field}
                                    id={`entries.${index}.svgName`}
                                    type="text"
                                    size="lg"
                                    fontSize="16px"
                                    fontWeight={400}
                                    background="#F6F6F6"
                                    borderRadius={6}
                                    _placeholder={{ color: "gray.500" }}
                                    _hover={{ background: "#e0e0e0" }}
                                    width={150}
                                  />
                                </FormControl>
                              )}
                            </Field>
                            <Field
                              name={`entries.${index}.alternativeNames`}
                              mr={3}
                            >
                              {({ field }) => (
                                <FormControl mr={3}>
                                  <Input
                                    {...field}
                                    id={`entries.${index}.alternativeNames`}
                                    type="text"
                                    size="lg"
                                    fontSize="16px"
                                    fontWeight={400}
                                    background="#F6F6F6"
                                    borderRadius={6}
                                    _placeholder={{ color: "gray.500" }}
                                    _hover={{ background: "#e0e0e0" }}
                                    width={275}
                                  />
                                </FormControl>
                              )}
                            </Field>
                            <Field name={`entries.${index}.prefixes`}>
                              {({ field }) => (
                                <FormControl mr={3}>
                                  <Input
                                    {...field}
                                    id={`entries.${index}.prefixes`}
                                    type="text"
                                    size="lg"
                                    fontSize="16px"
                                    fontWeight={400}
                                    background="#F6F6F6"
                                    borderRadius={6}
                                    _placeholder={{ color: "gray.500" }}
                                    _hover={{ background: "#e0e0e0" }}
                                    width={275}
                                  />
                                </FormControl>
                              )}
                            </Field>
                            <Field name={`entries.${index}.grouping`}>
                              {({ field }) => (
                                <FormControl mr={3}>
                                  <Input
                                    {...field}
                                    id={`entries.${index}.grouping`}
                                    type="text"
                                    size="lg"
                                    fontSize="16px"
                                    fontWeight={400}
                                    background="#F6F6F6"
                                    borderRadius={6}
                                    _placeholder={{ color: "gray.500" }}
                                    _hover={{ background: "#e0e0e0" }}
                                    w={150}
                                  />
                                </FormControl>
                              )}
                            </Field>
                          </Flex>

                          <FieldArrayErrorMessage
                            name={`entries[${index}].name`}
                          />
                          <FieldArrayErrorMessage
                            name={`entries[${index}].code`}
                          />
                          <FieldArrayErrorMessage
                            name={`entries[${index}].svgName`}
                          />
                        </VStack>
                      </Flex>
                    ))}
                </div>
              )}
            />
          </Flex>

          <Flex mt={6} justifyContent="right">
            <Button onClick={onClose} mr={3}>
              Cancel
            </Button>
            <Button type="submit" colorScheme="teal" disabled={isSubmitting}>
              Submit
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};
