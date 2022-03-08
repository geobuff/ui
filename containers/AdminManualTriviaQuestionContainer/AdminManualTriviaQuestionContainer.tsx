import { useToast } from "@chakra-ui/react";
import React, { FC, useContext, useState } from "react";

import axiosClient from "../../axios";
import AdminManualTriviaQuestionForm from "../../components/AdminManualTriviaQuestionForm";
import { EditValues } from "../../components/AdminManualTriviaQuestionForm/AdminManualTriviaQuestionForm";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { createManualTriviaQuestionToast } from "../../helpers/toasts";
import useTriviaQuestionTypes from "../../hooks/UseTriviaQuestionTypes";
import { CreateManualTriviaAnswerDto } from "../../types/create-manual-trivia-answer-dto";
import { CreateManualTriviaQuestionFormSubmit } from "../../types/create-manual-trivia-question-form-submit";

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

  const handleSubmit = (
    values: CreateManualTriviaQuestionFormSubmit,
    { resetForm }
  ): void => {
    setIsSubmitting(true);
    setError("");

    const answers: CreateManualTriviaAnswerDto[] = [
      {
        text: values.answerOneText,
        isCorrect: values.correctAnswer === 1,
        flagCode: values.answerOneFlagCode,
      },
      {
        text: values.answerTwoText,
        isCorrect: values.correctAnswer === 2,
        flagCode: values.answerTwoFlagCode,
      },
    ];

    if (values.answerThreeText) {
      answers.push({
        text: values.answerThreeText,
        isCorrect: values.correctAnswer === 3,
        flagCode: values.answerThreeFlagCode,
      });
    }

    if (values.answerFourText) {
      answers.push({
        text: values.answerFourText,
        isCorrect: values.correctAnswer === 4,
        flagCode: values.answerFourFlagCode,
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

    axiosClient
      .post(`/manual-trivia-questions`, payload, getAuthConfig())
      .then(() => {
        toast(createManualTriviaQuestionToast());
        resetForm();
      })
      .catch((error) => setError(error.response.data))
      .finally(() => setIsSubmitting(false));
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
