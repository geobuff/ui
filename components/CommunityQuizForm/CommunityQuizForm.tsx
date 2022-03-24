import React, { FC } from "react";
import { Formik } from "formik";
import { Button, Divider, Flex, Text } from "@chakra-ui/react";

import CommunityQuizFormField from "./CommunityQuizFormField";
import CommunityQuizQuestionsField from "./CommunityQuizQuestionsField";

export interface FormValues {
  quizName: string;
}

export interface Props {
  values?: FormValues;
}

const initialValues = { quizName: "", description: "" };

const CommunityQuizForm: FC<Props> = ({ values = initialValues }) => {
  return (
    <Formik
      initialValues={values}
      onSubmit={(values) => console.log(values, "values")}
    >
      <Flex direction="column" width="100%">
        <CommunityQuizFormField
          name="quizName"
          label="Quiz Name"
          helper="Keep it concise and memorable!"
          placeholder="Enter quiz name..."
        />
        {/* TODO: add textarea type */}
        <CommunityQuizFormField
          name="description"
          label="Description"
          helper="The description helps your quiz stand out from the rest"
          placeholder="Enter description..."
        />

        <Divider my={5} borderColor="gray.100" borderWidth={1} />

        <Flex width="100%" justifyContent="center" marginY={4}>
          <CommunityQuizQuestionsField />
        </Flex>

        <Divider my={5} borderColor="gray.100" borderWidth={1} />

        <Flex justifyContent="flex-end" marginTop={8}>
          <Button type="submit" colorScheme="green" size="lg">
            {"Create Quiz"}
          </Button>
        </Flex>
      </Flex>
    </Formik>
  );
};

export default CommunityQuizForm;
