import React, { FC, useContext, useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";

import axiosClient from "../../axios/axiosClient";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { editCommunityQuizToast } from "../../helpers/toasts";
import useTriviaQuestionTypes from "../../hooks/UseTriviaQuestionTypes";

import { CommunityQuizFormSubmit } from "../../types/community-quiz-form-submit";
import { CommunityQuizPayload } from "../../types/community-quiz-payload";
import useCommunityQuiz from "../../hooks/UseCommunityQuiz";
import { GetCommunityQuiz } from "../../types/get-community-quiz-dto";
import EditCommunityQuizForm from "../../components/EditCommunityQuizForm";

interface Props {
  quizId: number;
}

const EditCommunityQuizFormContainer: FC<Props> = ({ quizId }) => {
  const { data: quiz, isLoading: isQuizLoading } = useCommunityQuiz(quizId);

  const {
    data: types,
    isLoading: isQuestionTypesLoading,
  } = useTriviaQuestionTypes();

  const { user, isLoading: isUserLoading, getAuthConfig } = useContext(
    CurrentUserContext
  );

  const toast = useToast();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push("/login");
    }
  }, [user, isUserLoading, router]);

  const getValuesFromQuiz = (
    quiz: GetCommunityQuiz
  ): CommunityQuizFormSubmit => {
    return {
      name: quiz.name,
      description: quiz.description,
      isPublic: quiz.isPublic,
      questions: quiz.questions.map((q) => {
        return {
          id: q.id,
          typeId: q.typeId.toString(),
          question: q.question,
          explainer: q.explainer,
          map: q.map,
          highlighted: q.highlighted,
          flagCode: q.flagCode,
          imageUrl: q.imageUrl,
          correctAnswer: q.answers?.findIndex((a) => a.isCorrect) ?? 0,
          answers: q.answers.map((a) => {
            return {
              text: a.text,
              isCorrect: a.isCorrect,
              flagCode: a.flagCode,
            };
          }),
        };
      }),
    };
  };

  const redirectToProfile = () => {
    setTimeout(() => {
      router.push(`/profile/${user.id}`);
    }, 2000);
  };

  const handleSubmit = (values: CommunityQuizFormSubmit): void => {
    setIsSubmitting(true);

    const payload: CommunityQuizPayload = {
      userId: user.id,
      name: values.name,
      description: values.description,
      isPublic: values.isPublic,
      maxScore: values.questions?.length || 0,
      questions: values.questions?.map((question) => ({
        id: {
          Int64: question.id ?? 0,
          Valid: !!question.id,
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
      .put(`/community-quizzes/${quizId}`, payload, getAuthConfig())
      .then(() => {
        toast(editCommunityQuizToast());
        redirectToProfile();
      })
      .catch((error) => setError(error.response.data))
      .finally(() => setIsSubmitting(false));
  };

  if (isQuestionTypesLoading || isQuizLoading || isUserLoading) {
    return null;
  }

  return (
    <EditCommunityQuizForm
      values={getValuesFromQuiz(quiz)}
      error={error}
      types={types}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
    />
  );
};

export default EditCommunityQuizFormContainer;
