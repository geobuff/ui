import { useToast } from "@chakra-ui/react";
import React, { FC, useContext, useState } from "react";

import axiosClient from "../../axios";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { manualTriviaQuestionToast } from "../../helpers/toasts";
import useTriviaQuestionTypes from "../../hooks/UseTriviaQuestionTypes";
import { ManualTriviaAnswer } from "../../types/manual-trivia-answer";

import AdminManualTriviaQuestionForm from "../../components/AdminManualTriviaQuestionForm";
import { NullTime } from "../../types/null-time";
import { ManualTriviaQuestionEditValues } from "../../types/manual-trivia-question-edit-values";

export interface Props {
  editValues?: ManualTriviaQuestionEditValues;
  onClose?: () => void;
}

const AdminManualTriviaQuestionContainer: FC<Props> = ({
  editValues,
  onClose,
}) => {
  const toast = useToast();

  const { getAuthConfig } = useContext(CurrentUserContext);
  const { data: types, isLoading } = useTriviaQuestionTypes();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (
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
      question: values.question,
      map: values.map,
      highlighted: values.highlighted,
      flagCode: values.flagCode,
      imageUrl: values.imageUrl,
      answers: answers,
      quizDate: quizDate,
    };

    if (editValues) {
      axiosClient
        .put(`/manual-trivia-questions/${values.id}`, payload, getAuthConfig())
        .then(() => {
          toast(manualTriviaQuestionToast("Edit", "edited"));
        })
        .catch((error) => setError(error.response.data))
        .finally(() => setIsSubmitting(false));
    } else {
      axiosClient
        .post(`/manual-trivia-questions`, payload, getAuthConfig())
        .then(() => {
          toast(manualTriviaQuestionToast());
          resetForm();
        })
        .catch((error) => setError(error.response.data))
        .finally(() => setIsSubmitting(false));
    }
  };

  return (
    <AdminManualTriviaQuestionForm
      types={types}
      editValues={editValues}
      isLoading={isLoading}
      isSubmitting={isSubmitting}
      error={error}
      onSubmit={handleSubmit}
      onClose={onClose}
    />
  );
};

export default AdminManualTriviaQuestionContainer;
