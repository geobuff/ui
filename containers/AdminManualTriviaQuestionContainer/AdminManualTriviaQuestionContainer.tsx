import { useToast } from "@chakra-ui/react";
import React, { FC, useContext, useState } from "react";

import axiosClient from "../../axios";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { ManualTriviaQuestionToast } from "../../helpers/toasts";
import useTriviaQuestionTypes from "../../hooks/UseTriviaQuestionTypes";
import { ManualTriviaAnswer } from "../../types/manual-trivia-answer";

import AdminManualTriviaQuestionForm from "../../components/AdminManualTriviaQuestionForm";
import { EditValues } from "../../components/AdminManualTriviaQuestionForm/AdminManualTriviaQuestionForm";

export interface Props {
  editValues?: EditValues;
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

  const handleSubmit = (values: EditValues, { resetForm }): void => {
    setIsSubmitting(true);
    setError("");

    const answers: ManualTriviaAnswer[] = [
      {
        id: values?.answers[0]?.id,
        text: values.answerOneText,
        isCorrect: values.correctAnswer === 1,
        flagCode: values.answerOneFlagCode,
        manualTriviaQuestionId: values.id,
      },
      {
        id: values?.answers[1]?.id,
        text: values.answerTwoText,
        isCorrect: values.correctAnswer === 2,
        flagCode: values.answerTwoFlagCode,
        manualTriviaQuestionId: values.id,
      },
    ];

    if (values.answerThreeText) {
      answers.push({
        id: values?.answers[2].id,
        text: values.answerThreeText,
        isCorrect: values.correctAnswer === 3,
        flagCode: values.answerThreeFlagCode,
        manualTriviaQuestionId: values.id,
      });
    }

    if (values.answerFourText) {
      answers.push({
        id: values?.answers[3].id,
        text: values.answerFourText,
        isCorrect: values.correctAnswer === 4,
        flagCode: values.answerFourFlagCode,
        manualTriviaQuestionId: values.id,
      });
    }

    const payload = {
      typeId: parseInt(values.typeId),
      question: values.question,
      map: values.map,
      highlighted: values.highlighted,
      flagCode: values.flagCode,
      imageUrl: values.imageUrl,
      answers: answers,
      quizDate: values.quizDate || null,
    };

    if (editValues) {
      axiosClient
        .put(`/manual-trivia-questions/${values.id}`, payload, getAuthConfig())
        .then(() => {
          toast(ManualTriviaQuestionToast("Edit"));
          resetForm();
        })
        .catch((error) => setError(error.response.data))
        .finally(() => setIsSubmitting(false));
    } else {
      axiosClient
        .post(`/manual-trivia-questions`, payload, getAuthConfig())
        .then(() => {
          toast(ManualTriviaQuestionToast("Create"));
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
