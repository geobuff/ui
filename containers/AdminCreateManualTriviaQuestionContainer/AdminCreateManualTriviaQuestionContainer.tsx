import { useToast } from "@chakra-ui/react";
import React, { FC, useContext, useState } from "react";

import axiosClient from "../../axios";
import AdminCreateManualTriviaQuestionForm from "../../components/AdminCreateManualTriviaQuestionForm";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { createManualTriviaQuestionToast } from "../../helpers/toasts";
import useTriviaQuestionTypes from "../../hooks/UseTriviaQuestionTypes";
import { CreateManualTriviaAnswerDto } from "../../types/create-manual-trivia-answer-dto";
import { CreateManualTriviaQuestionFormSubmit } from "../../types/create-manual-trivia-question-form-submit";

const AdminCreateManualTriviaQuestionContainer: FC = () => {
  const toast = useToast();

  const { getAuthConfig } = useContext(CurrentUserContext);
  const {
    data: types,
    isLoading: isQuestionTypesLoading,
  } = useTriviaQuestionTypes();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (values: CreateManualTriviaQuestionFormSubmit): void => {
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
    };

    axiosClient
      .post(`/manual-trivia-questions`, payload, getAuthConfig())
      .then(() => toast(createManualTriviaQuestionToast()))
      .catch((error) => setError(error.response.data))
      .finally(() => setIsSubmitting(false));
  };

  if (isQuestionTypesLoading) {
    return null;
  }

  return (
    <AdminCreateManualTriviaQuestionForm
      types={types}
      isSubmitting={isSubmitting}
      error={error}
      onSubmit={handleSubmit}
    />
  );
};

export default AdminCreateManualTriviaQuestionContainer;
