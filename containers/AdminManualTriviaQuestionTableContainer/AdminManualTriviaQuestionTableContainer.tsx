import { Flex, useDisclosure } from "@chakra-ui/react";
import React, { FC, useContext, useEffect, useState } from "react";
import axiosClient from "../../axios";
import AdminManualTriviaQuestions from "../../components/AdminManualTriviaQuestions";
import DeleteTriviaQuestionModal from "../../components/DeleteTriviaQuestionModal";
import Modal from "../../components/Modal";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import useTriviaQuestionCategories from "../../hooks/UseTriviaQuestionCategories";
import useTriviaQuestionTypes from "../../hooks/UseTriviaQuestionTypes";
import { ManualTriviaQuestion } from "../../types/manual-trivia-question";
import { ManualTriviaQuestionEditValues } from "../../types/manual-trivia-question-edit-values";
import { TriviaQuestionFilterParams } from "../../types/trivia-question-filter-param";
import { TriviaQuestionTypes } from "../../types/trivia-question-types";
import AdminManualTriviaQuestionContainer from "../AdminManualTriviaQuestionContainer";

const AdminManualTriviaQuestionTableContainer: FC = () => {
  const { getAuthConfig } = useContext(CurrentUserContext);
  const { data: types, isLoading: isTypesLoading } = useTriviaQuestionTypes();
  const {
    data: categories,
    isLoading: isCategoriesLoading,
  } = useTriviaQuestionCategories();

  const [filterParams, setFilterParams] = useState<TriviaQuestionFilterParams>({
    page: 0,
    limit: 10,
  });

  const [entries, setEntries] = useState<ManualTriviaQuestion[]>([]);
  const [hasMoreEntries, setHasMoreEntries] = useState(false);

  const [isLoadingEntries, setIsLoadingEntries] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [questionId, setQuestionId] = useState(0);

  const [selectedQuestion, setSelectedQuestion] = useState<
    ManualTriviaQuestionEditValues
  >(null);

  const {
    isOpen: isDeleteQuestionModalOpen,
    onOpen: onDeleteQuestionModalOpen,
    onClose: onDeleteQuestionModalClose,
  } = useDisclosure();

  const {
    isOpen: isQuestionModalOpen,
    onOpen: onQuestionModalOpen,
    onClose: onQuestionModalClose,
  } = useDisclosure();

  useEffect(() => {
    setIsLoadingEntries(true);
    axiosClient
      .post(`/manual-trivia-questions/all`, filterParams, getAuthConfig())
      .then((response) => {
        setEntries(response.data.questions);
        setHasMoreEntries(response.data.hasMore);
      })
      .finally(() => setIsLoadingEntries(false));
  }, [getAuthConfig, filterParams]);

  const handleCreateQuestionClick = () => {
    setSelectedQuestion(null);
    onQuestionModalOpen();
  };

  const getTypeIDByName = (typeName: TriviaQuestionTypes) => {
    switch (true) {
      case typeName === "Image":
        return "2";
      case typeName === "Flag":
        return "3";
      case typeName === "Map":
        return "4";
      default:
        return "1";
    }
  };

  const handleEditQuestionClick = (question: ManualTriviaQuestion) => {
    setSelectedQuestion({
      id: question.id.toString(),
      typeId: getTypeIDByName(question.type as TriviaQuestionTypes),
      question: question.question,
      explainer: question.explainer,
      answerOneText: question.answers[0]?.text || "",
      answerOneFlagCode: question.answers[0]?.flagCode || "",
      answerTwoText: question.answers[1]?.text || "",
      answerTwoFlagCode: question.answers[1]?.flagCode || "",
      answerThreeText: question?.answers[2]?.text || "",
      answerThreeFlagCode: question?.answers[2]?.flagCode || "",
      answerFourText: question?.answers[3]?.text || "",
      answerFourFlagCode: question?.answers[3]?.flagCode || "",
      correctAnswer: question.answers.findIndex((a) => a.isCorrect) + 1,
      hasFlagAnswers: !!question.answers.find((a) => a.flagCode) || false,
      imageUrl: question?.imageUrl || "",
      flagCode: question?.flagCode || "",
      map: question?.map || "",
      highlighted: question?.highlighted || "",
      quizDate: question?.quizDate.Valid
        ? question?.quizDate.Time.toString()
        : null,
      answers: question?.answers || [],
    });

    onQuestionModalOpen();
  };

  const handleDeleteQuestion = (questionId: number): void => {
    setQuestionId(questionId);
    onDeleteQuestionModalOpen();
  };

  const handleSubmit = (): void => {
    setIsSubmitting(true);
    setError(false);

    axiosClient
      .delete(`/manual-trivia-questions/${questionId}`, getAuthConfig())
      .then(() => {
        setEntries(entries.filter((x) => x.id !== questionId));
        onDeleteQuestionModalClose();
      })
      .catch(() => setError(true))
      .finally(() => setIsSubmitting(false));
  };

  return (
    <>
      <AdminManualTriviaQuestions
        entries={entries}
        hasMoreEntries={hasMoreEntries}
        types={types}
        categories={categories}
        isLoading={isLoadingEntries || isTypesLoading || isCategoriesLoading}
        filterParams={filterParams}
        onChangeFilterParams={setFilterParams}
        onCreateQuestionClick={handleCreateQuestionClick}
        onEditQuestionClick={handleEditQuestionClick}
        onDeleteQuestionClick={handleDeleteQuestion}
      />
      <DeleteTriviaQuestionModal
        isOpen={isDeleteQuestionModalOpen}
        onClose={onDeleteQuestionModalClose}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        error={error}
      />
      <Modal
        isOpen={isQuestionModalOpen}
        onClose={onQuestionModalClose}
        maxHeight={{ base: "100%", md: "700px" }}
        minWidth="660px"
      >
        <Flex padding={10} width="100%" overflow="scroll">
          <AdminManualTriviaQuestionContainer
            editValues={selectedQuestion}
            onClose={onQuestionModalClose}
          />
        </Flex>
      </Modal>
    </>
  );
};

export default AdminManualTriviaQuestionTableContainer;
