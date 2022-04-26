import React, { FC, useContext, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";

import axiosClient from "../../axios/axiosClient";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { createCommunityQuizToast } from "../../helpers/toasts";
import useTriviaQuestionTypes from "../../hooks/UseTriviaQuestionTypes";

import CommunityQuizForm from "../../components/CommunityQuizForm";
import { CommunityQuizFormSubmit } from "../../types/community-quiz-form-submit";
import { CommunityQuizPayload } from "../../types/community-quiz-payload";

const CommunityQuizFormContainer: FC = () => {
  const { data: types, isLoading } = useTriviaQuestionTypes();
  const { user, getAuthConfig } = useContext(CurrentUserContext);
  const toast = useToast();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const redirectToProfile = () => {
    setTimeout(() => {
      router.push(`/profile/${user.id}`);
    }, 500);
  };

  const handleSubmit = (values: CommunityQuizFormSubmit): void => {
    setIsSubmitting(true);

    const payload: CommunityQuizPayload = {
      userId: user.id,
      name: values.name,
      description: values.description,
      maxScore: values.questions?.length || 0,
      questions: values.questions?.map((question) => ({
        id: {
          Int64: question.id ?? 0,
          Valid: !!question.id,
        },
        typeId: parseInt(question.typeId),
        question: question.question,
        map: question.map,
        highlighted: question.highlighted,
        flagCode: question.flagCode,
        imageUrl: question.imageUrl,
        answers: question.answers?.map((answer, index) => ({
          text: answer.text,
          flagCode: answer.flagCode,
          isCorrect: index === question.correctAnswer,
        })),
      })),
    };

    axiosClient
      .post(`/community-quizzes`, payload, getAuthConfig())
      .then(() => {
        toast(createCommunityQuizToast());
        redirectToProfile();
      })
      .catch((error) => setError(error.response.data))
      .finally(() => setIsSubmitting(false));
  };

  return (
    <CommunityQuizForm
      error={error}
      types={types}
      isLoading={isLoading}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
    />
  );
};

export default CommunityQuizFormContainer;
