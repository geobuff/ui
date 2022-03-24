import React, { FC } from "react";
import { Formik } from "formik";
import { Flex } from "@chakra-ui/react";

import CommunityQuizFormField from "./CommunityQuizFormField";

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
      </Flex>
    </Formik>
  );
};

export default CommunityQuizForm;
