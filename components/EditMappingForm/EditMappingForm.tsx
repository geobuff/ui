import React, { FC } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";

import { EditMappingGroupSubmit } from "../../types/edit-mapping-group-submit";
import { Field, FieldArray, Form, Formik } from "formik";

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
  return (
    <Formik initialValues={values} onSubmit={onSubmit}>
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
                        <Field name={`entries.${index}.name`}>
                          {({ field }) => (
                            <FormControl>
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
                                maxW={250}
                              />
                            </FormControl>
                          )}
                        </Field>
                        <Field name={`entries.${index}.code`}>
                          {({ field }) => (
                            <FormControl>
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
                                maxW={250}
                              />
                            </FormControl>
                          )}
                        </Field>
                        <Field name={`entries.${index}.svgName`}>
                          {({ field }) => (
                            <FormControl>
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
                                maxW={250}
                              />
                            </FormControl>
                          )}
                        </Field>
                        <Field
                          name={`entries.${index}.alternativeNames`}
                          mr={3}
                        >
                          {({ field }) => (
                            <FormControl>
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
                                maxW={250}
                              />
                            </FormControl>
                          )}
                        </Field>
                        <Field name={`entries.${index}.prefixes`}>
                          {({ field }) => (
                            <FormControl>
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
                                maxW={250}
                              />
                            </FormControl>
                          )}
                        </Field>
                        <Field name={`entries.${index}.grouping`}>
                          {({ field }) => (
                            <FormControl>
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
