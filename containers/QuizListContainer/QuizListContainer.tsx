import React, { FC } from "react";

import { useAllQuizzes } from "../../hooks/UseAllQuizzes";

import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import QuizList from "../../components/QuizList";

interface Props {
  type: "map" | "flag";
}

export const QuizListContainer: FC<Props> = ({ type }) => {
  const { data: quizzes, isLoading } = useAllQuizzes(type);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <QuizList quizzes={quizzes} />;
};
