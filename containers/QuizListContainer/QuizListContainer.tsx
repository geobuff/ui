import React, { FC } from "react";
import { use100vh } from "react-div-100vh";

import QuizList from "../../components/QuizList";
import { getNumberOfQuizTilesByHeight } from "../../helpers/placeholder";
import useQuizzes from "../../hooks/UseQuizzes";
import QuizListPlaceholder from "../../placeholders/QuizListPlaceholder/QuizListPlaceholder";

interface Props {
  filter?: string;
}

const QuizListContainer: FC<Props> = ({ filter = "" }) => {
  const { quizzes, isLoading } = useQuizzes(filter);

  const height = use100vh();
  const noOfTiles = getNumberOfQuizTilesByHeight(height);

  if (isLoading) {
    return <QuizListPlaceholder noOfTiles={noOfTiles} />;
  }

  return <QuizList quizzes={quizzes} />;
};

export default QuizListContainer;
