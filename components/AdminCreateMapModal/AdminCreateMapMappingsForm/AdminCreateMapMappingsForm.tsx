import { Button, Flex, FormControl, Input } from "@chakra-ui/react";
import { Field, FieldArray, Form, Formik } from "formik";
import React, { FC } from "react";
import { CreateMappingEntry } from "../../../types/create-mapping-entry";
import { CreateMappingsSubmit } from "../../../types/create-mappings-submit";

export interface Props {
  mappings?: CreateMappingEntry[];
  onSubmit?: (values: CreateMappingsSubmit) => void;
  onPreviousPage?: (values: CreateMappingsSubmit) => void;
}

const AdminCreateMapMappingsForm: FC<Props> = ({
  mappings = [],
  onSubmit = () => {},
  onPreviousPage = () => {},
}) => {
  return (
    <Formik initialValues={{ mappings }} onSubmit={onSubmit}>
      {({ values }) => (
        <Form>
          <FieldArray
            name="mappings"
            render={() => (
              <div>
                {values.mappings &&
                  values.mappings.length > 0 &&
                  values.mappings.map((_, index) => (
                    <Flex justifyContent="space-between" key={index} mb={3}>
                      <Field name={`mappings.${index}.name`}>
                        {({ field }) => (
                          <FormControl>
                            <Input
                              {...field}
                              id={`mappings.${index}.name`}
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
                      <Field name={`mappings.${index}.code`} key={index}>
                        {({ field }) => (
                          <FormControl>
                            <Input
                              {...field}
                              id={`mappings.${index}.code`}
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
