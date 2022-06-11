import { useDisclosure, useToast } from "@chakra-ui/react";
import React, { FC, useContext, useEffect, useState } from "react";
import axiosClient from "../../axios";
import AdminManualTriviaQuestions from "../../components/AdminManualTriviaQuestions";
import CreateEditTriviaQuestionModal from "../../components/CreateEditTriviaQuestionModal";
import DeleteTriviaQuestionModal from "../../components/DeleteTriviaQuestionModal";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { manualTriviaQuestionToast } from "../../helpers/toasts";
import useTriviaQuestionCategories from "../../hooks/UseTriviaQuestionCategories";
import useTriviaQuestionTypes from "../../hooks/UseTriviaQuestionTypes";
import { ManualTriviaAnswer } from "../../types/manual-trivia-answer";
import { ManualTriviaQuestion } from "../../types/manual-trivia-question";
import { ManualTriviaQuestionEditValues } from "../../types/manual-trivia-question-edit-values";
import { NullTime } from "../../types/null-time";
import { TriviaQuestionFilterParams } from "../../types/trivia-question-filter-param";

const AdminManualTriviaQuestionTableContainer: FC = () => {
  const toast = useToast();

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
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
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
    isOpen: isCreateEditQuestionModalOpen,
    onOpen: onCreateEditQuestionModalOpen,
    onClose: onCreateEditQuestionModalClose,
  } = useDisclosure();

  useEffect(() => {
    setIsLoadingEntries(true);
    axiosClient
      .post(`/manual-trivia-questions/all`, filterParams, getAuthConfig())
      .then((response) => {
        setEntries(response.data.questions);
        setHasMoreEntries(response.data.hasMore);
        setSuccess(false);
      })
      .catch((error) => setError(error.response.data))
      .finally(() => setIsLoadingEntries(false));
  }, [getAuthConfig, filterParams, success]);

  const handleCreateQuestionClick = () => {
    setSelectedQuestion(null);
    onCreateEditQuestionModalOpen();
  };

  const handleEditQuestionClick = (question: ManualTriviaQuestion) => {
    setSelectedQuestion({
      id: question.id.toString(),
      typeId: question.typeId.toString(),
      categoryId: question.categoryId.toString(),
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

    onCreateEditQuestionModalOpen();
  };

  const handleDeleteQuestion = (questionId: number): void => {
    setQuestionId(questionId);
    onDeleteQuestionModalOpen();
  };

  const handleDeleteSubmit = (): void => {
    setIsSubmitting(true);
    setError("");

    axiosClient
      .delete(`/manual-trivia-questions/${questionId}`, getAuthConfig())
      .then(() => {
        setSuccess(true);
        onDeleteQuestionModalClose();
      })
      .catch((error) => setError(error.response.data))
      .finally(() => setIsSubmitting(false));
  };

  const handleCreateEditSubmit = (
    values: ManualTriviaQuestionEditValues,
    { resetForm }
  ): void => {
    setIsSubmitting(true);
    setError("");

    const answers: ManualTriviaAnswer[] = [
      {
        id: values.answers ? values.answers[0]?.id : 0,
        text: values.answerOneText,
        isCorrect: values.correctAnswer === 1,
        flagCode: values.answerOneFlagCode,
        manualTriviaQuestionId: values.id,
      },
      {
        id: values.answers ? values.answers[1]?.id : 0,
        text: values.answerTwoText,
        isCorrect: values.correctAnswer === 2,
        flagCode: values.answerTwoFlagCode,
        manualTriviaQuestionId: values.id,
      },
    ];

    if (values.answerThreeText) {
      answers.push({
        id: values.answers ? values.answers[2]?.id : 0,
        text: values.answerThreeText,
        isCorrect: values.correctAnswer === 3,
        flagCode: values.answerThreeFlagCode,
        manualTriviaQuestionId: values.id,
      });
    }

    if (values.answerFourText) {
      answers.push({
        id: values.answers ? values.answers[3]?.id : 0,
        text: values.answerFourText,
        isCorrect: values.correctAnswer === 4,
        flagCode: values.answerFourFlagCode,
        manualTriviaQuestionId: values.id,
      });
    }

    const quizDate: NullTime = {
      Valid: !!values.quizDate,
      Time: values.quizDate ? new Date(values.quizDate) : new Date(),
    };

    const payload = {
      typeId: parseInt(values.typeId),
      categoryId: parseInt(values.categoryId),
      question: values.question,
      map: values.map,
      highlighted: values.highlighted,
      flagCode: values.flagCode,
      imageUrl: values.imageUrl,
      explainer: values.explainer,
      answers: answers,
      quizDate: quizDate,
    };

    if (selectedQuestion) {
      axiosClient
        .put(`/manual-trivia-questions/${values.id}`, payload, getAuthConfig())
        .then(() => {
          setSuccess(true);
          toast(manualTriviaQuestionToast("Edit", "edited"));
        })
        .catch((error) => setError(error.response.data))
        .finally(() => setIsSubmitting(false));
    } else {
      axiosClient
        .post(`/manual-trivia-questions`, payload, getAuthConfig())
        .then(() => {
          setSuccess(true);
          toast(manualTriviaQuestionToast());
          resetForm();
        })
        .catch((error) => setError(error.response.data))
        .finally(() => setIsSubmitting(false));
    }
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
        error={error}
        onChangeFilterParams={setFilterParams}
        onCreateQuestionClick={handleCreateQuestionClick}
        onEditQuestionClick={handleEditQuestionClick}
        onDeleteQuestionClick={handleDeleteQuestion}
      />
      <DeleteTriviaQuestionModal
        isOpen={isDeleteQuestionModalOpen}
        onClose={onDeleteQuestionModalClose}
        onSubmit={handleDeleteSubmit}
        isSubmitting={isSubmitting}
        error={error}
      />
      <CreateEditTriviaQuestionModal
        types={types}
        categories={categories}
        editValues={selectedQuestion}
        isOpen={isCreateEditQuestionModalOpen}
        isLoading={isTypesLoading || isCategoriesLoading}
        isSubmitting={isSubmitting}
        error={error}
        onSubmit={handleCreateEditSubmit}
        onClose={onCreateEditQuestionModalClose}
      />
    </>
  );
};

export default AdminManualTriviaQuestionTableContainer;
