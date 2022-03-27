import React, { FC, useState } from "react";
import { Formik } from "formik";
import { Button, Divider, Flex, useDisclosure } from "@chakra-ui/react";

import CommunityQuizFormField from "./CommunityQuizFormField";
import CommunityQuizQuestionsField from "./CommunityQuizQuestionsField";
import Modal from "../Modal";
import CommunityQuizQuestionForm from "./CommunityQuizQuestionForm";
import useTriviaQuestionTypes from "../../hooks/UseTriviaQuestionTypes";
import { CommunityQuizQuestion } from "./CommunityQuizQuestionsField/CommunityQuizQuestionsField";

export interface FormValues {
  quizName: string;
}

export interface Props {
  values?: FormValues;
}

const initialValues = { quizName: "", description: "" };

const CommunityQuizForm: FC<Props> = ({ values = initialValues }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // TODO: move to container
  const { data: types, isLoading } = useTriviaQuestionTypes();

  const [questions, setQuestions] = useState<CommunityQuizQuestion[]>([]);
  console.log(questions, "questions");

  const handleAddQuestion = (values: any) => {
    setQuestions([...questions, values]);
    onClose();
  };

  // TODO: refactor to include some id as filtering on name will remove questions
  // with the same questions
  return (
    <>
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
            direction="row"
          />
          {/* TODO: add textarea type */}
          <CommunityQuizFormField
            name="description"
            label="Description"
            helper="The description helps your quiz stand out from the rest"
            placeholder="Enter description..."
            direction="row"
          />

          <Divider my={5} borderColor="gray.100" borderWidth={1} />

          <Flex width="100%" justifyContent="center" marginY={4}>
            <CommunityQuizQuestionsField
              questions={questions}
              onAddQuestion={onOpen}
              onDeleteQuestion={(question) => {
                setQuestions(
                  questions.filter((q) => q.question !== question.question)
                );
              }}
            />
          </Flex>

          <Divider my={5} borderColor="gray.100" borderWidth={1} />

          <Flex justifyContent="flex-end" marginTop={8}>
            <Button type="submit" colorScheme="green">
              {"Create Quiz"}
            </Button>
          </Flex>
        </Flex>
      </Formik>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        maxHeight={{ base: "100%", md: "700px" }}
        minWidth="660px"
        hasCloseButton
        header={"Add Question"}
      >
        <Flex paddingX={10} width="100%" overflow="scroll" marginBottom={10}>
          <CommunityQuizQuestionForm
            types={types}
            onSubmit={handleAddQuestion}
          />
        </Flex>
      </Modal>
    </>
  );
};

export default CommunityQuizForm;
