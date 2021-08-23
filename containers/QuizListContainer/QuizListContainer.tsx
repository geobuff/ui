import React, { FC } from "react";

import QuizList from "../../components/QuizList";
import useQuizzes from "../../hooks/UseQuizzes";
import QuizListPlaceholder from "../../placeholders/QuizListPlaceholder/QuizListPlaceholder";

interface Props {
  filter?: string;
}

const QuizListContainer: FC<Props> = ({ filter = "" }) => {
  const { quizzes, isLoading } = useQuizzes(filter);

  if (isLoading) {
    return <QuizListPlaceholder noOfTiles={8} />;
  }

  return <QuizList quizzes={quizzes} />;
};

export default QuizListContainer;
