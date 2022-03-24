import React, { FC } from "react";
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";

export interface FormValues {
  quizName: string;
}

export interface Props {
  values?: FormValues;
}

const initialValues = { quizName: "" };

const CommunityQuizForm: FC<Props> = ({ values = initialValues }) => {
  return (
    <Formik initialValues={values} onSubmit={(values) => console.log(values)}>
      <Flex width="100%">
        <Field name="quizName">
          {({ field, form }) => (
            <FormControl
              isInvalid={form.errors.question && form.touched.question}
            >
              <Flex>
                <Flex width="50%" direction="column">
                  <FormLabel
                    htmlFor="question"
                    fontWeight="bold"
                    marginBottom={0.5}
                  >
                    {"Quiz Name"}
                  </FormLabel>
                  <FormHelperText marginTop={0}>
                    {"Keep it concise and memorable!"}
                  </FormHelperText>
                </Flex>
                <Input
                  width="50%"
                  {...field}
                  id="quizName"
                  type="text"
                  placeholder="Enter quiz name..."
                  size="lg"
                  fontSize="16px"
                  fontWeight={400}
                  background="#F6F6F6"
                  borderRadius={6}
                  _placeholder={{ color: "gray.500" }}
                  _hover={{ background: "#e0e0e0" }}
                />
              </Flex>
              <FormErrorMessage fontSize="11px">
                {form.errors.quizName}
              </FormErrorMessage>
            </FormControl>
          )}
        </Field>
      </Flex>
    </Formik>
  );
};

export default CommunityQuizForm;
