import React, { FC } from "react";

import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Field, FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";

import { CreateMappingsSubmit } from "../../../types/create-mappings-submit";

const validationSchema = Yup.object().shape({
  groupName: Yup.string().required("Please enter a group name."),
  entries: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Please enter a name for mapping entry."),
      code: Yup.string().required("Please enter a code for mapping entry."),
    })
  ),
});

export interface Props {
  values?: CreateMappingsSubmit;
  onSubmit?: (values: CreateMappingsSubmit) => void;
  onPreviousPage?: (values: CreateMappingsSubmit) => void;
}

const AdminCreateMapMappingsForm: FC<Props> = ({
  values = null,
  onSubmit = () => {},
  onPreviousPage = () => {},
}) => {
  return (
    <Formik
      initialValues={values}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ values }) => (
        <Form>
          <Flex>
            <Field name="groupName">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.groupName && form.touched.groupName}
                >
                  <FormLabel htmlFor="groupName" fontWeight="bold">
                    {"Group Name"}
                  </FormLabel>
                  <Input
                    {...field}
                    id="groupName"
                    type="text"
                    placeholder="Enter group name..."
                    size="lg"
                    fontSize="16px"
                    fontWeight={400}
                    background="#F6F6F6"
                    borderRadius={6}
                    _placeholder={{ color: "gray.500" }}
                    _hover={{ background: "#e0e0e0" }}
                  />
                  <FormErrorMessage fontSize="11px">
                    {form.errors.groupName}
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
                      <Flex justifyContent="space-between" key={index} mb={3}>
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
                        <Field name={`entries.${index}.code`} key={index}>
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
                      </Flex>
                    ))}
                </div>
              )}
            />
          </Flex>

          <Flex mt={6} justifyContent="right">
            <Button onClick={() => onPreviousPage(values)} mr={3}>
              Back
            </Button>
            <Button type="submit" colorScheme="teal">
              Next
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

export default AdminCreateMapMappingsForm;
