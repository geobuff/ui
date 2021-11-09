import React, { FC } from "react";
import { use100vh } from "react-div-100vh";

import QuizList from "../../components/QuizList";
import useQuizzes from "../../hooks/UseQuizzes";
import QuizListPlaceholder from "../../placeholders/QuizListPlaceholder/QuizListPlaceholder";

interface Props {
  filter?: string;
}

const getNumberOfTilesByHeight = (height: number): number => {
  // Ensure we always have something rendering immediately
  if (height === null) {
    return 20;
  }

  switch (true) {
    case height >= 1300:
      return 20;
    case height < 1300 && height >= 1000:
      return 15;
    default:
      return 10;
  }
};

const QuizListContainer: FC<Props> = ({ filter = "" }) => {
  const { quizzes, isLoading } = useQuizzes(filter);

  const height = use100vh();
  const noOfTiles = getNumberOfTilesByHeight(height);

  console.log(height, "height");

  if (isLoading) {
    return <QuizListPlaceholder noOfTiles={noOfTiles} />;
  }

  return <QuizList quizzes={quizzes} />;
};

export default QuizListContainer;
