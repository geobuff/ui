import React, { FC, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";

import axiosClient from "../../axios/axiosClient";
import { createCommunityQuizToast } from "../../helpers/toasts";
import useTriviaQuestionTypes from "../../hooks/UseTriviaQuestionTypes";

import CommunityQuizForm from "../../components/CommunityQuizForm";
import { CommunityQuizFormSubmit } from "../../types/community-quiz-form-submit";
import { CommunityQuizPayload } from "../../types/community-quiz-payload";
import { useSession } from "next-auth/react";
import { AuthUser } from "../../types/auth-user";

const CommunityQuizFormContainer: FC = () => {
  const { data: types, isLoading: isTypesLoading } = useTriviaQuestionTypes();

  const { data: session } = useSession();
  const user = session?.user as AuthUser;

  const toast = useToast();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const redirectToProfile = () => {
    setTimeout(() => {
      router.push(`/profile/${user?.id}`);
    }, 500);
  };

  const handleSubmit = (values: CommunityQuizFormSubmit): void => {
    setIsSubmitting(true);

    const payload: CommunityQuizPayload = {
      userId: user.id,
      name: values.name,
      description: values.description,
      isPublic: values.isPublic === "true",
      maxScore: values.questions?.length || 0,
      questions: values.questions?.map((question) => ({
        id: {
          Int64: 0,
          Valid: false,
        },
        typeId: parseInt(question.typeId),
        question: question.question,
        explainer: question.explainer,
        map: question.map,
        highlighted: question.highlighted,
        flagCode: question.flagCode,
        imageUrl: question.imageUrl,
        answers: question.answers,
      })),
    };

    axiosClient
      .post(`/community-quizzes`, payload, user?.authConfig)
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
      isLoading={isTypesLoading}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
    />
  );
};

export default CommunityQuizFormContainer;
