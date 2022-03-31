import React, { FC, useContext, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";

import axiosClient from "../../axios/axiosClient";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { createCommunityQuizToast } from "../../helpers/toasts";
import useTriviaQuestionTypes from "../../hooks/UseTriviaQuestionTypes";

import CommunityQuizForm from "../../components/CommunityQuizForm";

const CommunityQuizFormContainer: FC = () => {
  const { data: types, isLoading } = useTriviaQuestionTypes();
  const { user, getAuthConfig } = useContext(CurrentUserContext);
  const toast = useToast();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>(null);

  const redirectToProfile = () => {
    setTimeout(() => {
      router.push(`/profile/${user.id}`);
    }, 500);
  };

  const handleSubmit = (values: any): void => {
    setIsSubmitting(true);

    const payload = {
      userId: user.id,
      name: values.quizName,
      description: values.description,
      maxScore: values.questions.length || 0,
      questions: values.questions?.map((q) => ({
        typeId: parseInt(q.typeId),
        question: q.question,
        map: q.map || "",
        highlighted: q.highlighted || "",
        flagCode: q.flagCode || "",
        imageUrl: q.imageUrl || "",
        answers: q.answers?.map((answer, index) => ({
          text: answer.text,
          flagCode: answer.flagCode || "",
          isCorrect: index === values.correctAnswer,
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
