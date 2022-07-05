import React, { FC, useState } from "react";
import { Form, Formik } from "formik";
import {
  Alert,
  AlertIcon,
  Button,
  Divider,
  Flex,
  Heading,
  IconButton,
  Text,
  useBreakpointValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import * as Yup from "yup";

import Modal from "../Modal";
import ArrowLeft from "../../Icons/ArrowLeft";
import CommunityQuizFormField from "./CommunityQuizFormField";
import CommunityQuizQuestionsField from "./CommunityQuizQuestionsField";
import CommunityQuizQuestionForm from "./CommunityQuizQuestionForm";

import { TriviaQuestionType } from "../../types/trivia-question-type";
import { FormSetFieldValue } from "../../types/form";
import {
  CommunityQuizFormQuestion,
  CommunityQuizFormSubmit,
} from "../../types/community-quiz-form-submit";
import CommunityQuizRadioGroupFormField from "./CommunityQuizRadioGroupFormField";
import CommunityQuizTextAreaFormField from "./CommunityQuizTextAreaFormField";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Please enter a name for your quiz."),
  isPublic: Yup.string().required(
    "Please choose whether your quiz will be public or private."
  ),
  questions: Yup.array().min(1, "Must include at least one question."),
});

const initialValues: CommunityQuizFormSubmit = {
  name: "",
  description: "",
  isPublic: "false",
  questions: [],
};

export interface Props {
  error?: string;
  values?: CommunityQuizFormSubmit;
  isLoading?: boolean;
  isSubmitting?: boolean;
  types: TriviaQuestionType[];
  onSubmit: (values: CommunityQuizFormSubmit) => void;
  images?: string[];
  isSearchingImages?: boolean;
  isEmptyImageSearch?: boolean;
  onChangeSearchImage?: (query: string) => void;
}

const CommunityQuizForm: FC<Props> = ({
  error = "",
  values = initialValues,
  types = [],
  isLoading = false,
  isSubmitting = false,
  onSubmit = () => {},
  images = [],
  isSearchingImages = false,
  isEmptyImageSearch = false,
  onChangeSearchImage = () => {},
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const [questions, setQuestions] = useState<CommunityQuizFormQuestion[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<
    CommunityQuizFormQuestion
  >();

  const handleAddQuestion = (
    values: CommunityQuizFormQuestion,
    setFieldHelper: FormSetFieldValue
  ) => {
    const updated = JSON.parse(JSON.stringify(questions));
    if (values.index !== undefined) {
      const index = questions.findIndex((x) => x.index == values.index);
      updated.splice(index, 1);
    }

    const question = JSON.parse(JSON.stringify(values));
    for (let i = 0; i < question.answers.length; i++) {
      question.answers[i].isCorrect = i === question.correctAnswer;
    }

    updated.push({ ...question, index: questions.length });
    setQuestions(updated);
    setFieldHelper("questions", updated);
    onClose();
  };

  const handleEditQuestion = (selectedQuestion: CommunityQuizFormQuestion) => {
    setSelectedQuestion(selectedQuestion);
    onOpen();
  };

  const handleDeleteQuestion = (
    deletedQuestion: CommunityQuizFormQuestion,
    setFieldHelper
  ) => {
    const updatedQuestions = questions.filter(
      (q) => q.question !== deletedQuestion.question
    );

    setQuestions(updatedQuestions);
    setFieldHelper("questions", updatedQuestions);
  };

  const handleOpenQuestionForm = () => {
    setSelectedQuestion(undefined);
    onOpen();
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

  return (
    <VStack width="100%">
      {error && (
        <Alert status="error" borderRadius={6} marginBottom={3}>
          <AlertIcon />
          {error}
        </Alert>
      )}
      <Formik
        initialValues={values}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ values, setFieldValue, errors }) => (
          <Flex direction="column" width="100%">
            <Form autoComplete="off">
              <CommunityQuizFormField
                name="name"
                label="Quiz Name"
                helper="Keep it concise and memorable!"
                placeholder="Enter quiz name..."
                direction={isMobile ? "column" : "row"}
              />

              <CommunityQuizTextAreaFormField
                name="description"
                label="Description"
                helper="The description helps your quiz stand out from the rest."
                placeholder="Enter description..."
                direction={isMobile ? "column" : "row"}
              />

              <CommunityQuizRadioGroupFormField
                name="isPublic"
                label="Is Public?"
                helper="Public quizzes are visible to all users. Private quizzes give you the option to share a link with others."
                selectedValue={values.isPublic}
                setFieldHelper={setFieldValue}
                direction={isMobile ? "column" : "row"}
              />

              <Divider my={5} borderColor="gray.100" borderWidth={1} />

              <Flex
                direction="column"
                width="100%"
                justifyContent="center"
                marginY={4}
              >
                <CommunityQuizQuestionsField
                  questions={questions}
                  onAddQuestion={handleOpenQuestionForm}
                  onDeleteQuestion={(question) =>
                    handleDeleteQuestion(question, setFieldValue)
                  }
                  onEditQuestion={handleEditQuestion}
                />
                {errors.questions && (
                  <Text textAlign="center" color="red.500" fontSize="sm">
                    {"You must add at least one question"}
                  </Text>
                )}
              </Flex>

              <Divider my={5} borderColor="gray.100" borderWidth={1} />

              <Flex justifyContent="flex-end" marginTop={8}>
                <Button
                  type="submit"
                  colorScheme="green"
                  isLoading={isSubmitting}
                  disabled={isLoading}
                >
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
                  values={selectedQuestion}
                  images={images}
                  isSearchingImages={isSearchingImages}
                  isEmptyImageSearch={isEmptyImageSearch}
                  onChangeSearchImage={onChangeSearchImage}
                />
              </Flex>
            </Modal>
          </Flex>
        )}
      </Formik>
    </VStack>
  );
};

export default CommunityQuizForm;
