import React, { FC, useState } from "react";
import { Form, Formik } from "formik";
import {
  Button,
  Divider,
  Flex,
  Heading,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import * as Yup from "yup";

import CommunityQuizFormField from "./CommunityQuizFormField";
import CommunityQuizQuestionsField from "./CommunityQuizQuestionsField";
import Modal from "../Modal";
import CommunityQuizQuestionForm from "./CommunityQuizQuestionForm";
import useTriviaQuestionTypes from "../../hooks/UseTriviaQuestionTypes";
import { CommunityQuizQuestion } from "./CommunityQuizQuestionsField/CommunityQuizQuestionsField";
import ArrowLeft from "../../Icons/ArrowLeft";

const validationSchema = Yup.object().shape({
  quizName: Yup.string().required("Please enter a name for your quiz."),
  // questions: Yup.array().required("You must include at least one question"), // TODO: check for at least 1
});

export interface FormValues {
  quizName: string;
  description: string;
  questions: CommunityQuizQuestion[];
}

export interface Props {
  values?: FormValues;
}

const initialValues = { quizName: "", description: "", questions: [] };

const CommunityQuizForm: FC<Props> = ({ values = initialValues }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // TODO: move to container
  const { data: types, isLoading } = useTriviaQuestionTypes();

  const [questions, setQuestions] = useState<CommunityQuizQuestion[]>([]);
  console.log(questions, "questions");

  const handleAddQuestion = (values: any, setFieldHelper) => {
    setQuestions([...questions, values]);
    setFieldHelper("questions", [...questions, values]);
    onClose();
  };

  const header = (
    <Flex marginY={5} marginX={10} alignItems="center">
      <IconButton
        aria-label="close modal"
        variant="unstyled"
        size="sm"
        marginTop={0.5}
        marginRight={1.5}
        _hover={{ transform: "scale(1.15)" }}
        onClick={onClose}
      >
        <ArrowLeft height="28px" width="28px" />
      </IconButton>
      <Heading fontSize={26} marginLeft={0.5}>
        {"Add Question"}
      </Heading>
    </Flex>
  );

  // TODO: refactor to include some id as filtering on name will remove questions
  // with the same questions
  return (
    <>
      <Formik
        initialValues={values}
        validationSchema={validationSchema}
        onSubmit={(values) => console.log(values, "values")}
      >
        {({ values, setFieldValue, errors }) => (
          <Flex direction="column" width="100%">
            <Form autoComplete="off">
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
            </Form>
            <Modal
              isOpen={isOpen}
              onClose={onClose}
              maxHeight={{ base: "100%", md: "700px" }}
              minWidth="660px"
              hasCloseButton
              header={header}
            >
              <Flex
                direction="column"
                paddingX={10}
                width="100%"
                overflow="scroll"
                marginBottom={10}
              >
                <Divider marginBottom={6} />
                <CommunityQuizQuestionForm
                  types={types}
                  onSubmit={(values) =>
                    handleAddQuestion(values, setFieldValue)
                  }
                />
              </Flex>
            </Modal>
          </Flex>
        )}
      </Formik>
    </>
  );
};

export default CommunityQuizForm;
