import React, { FC } from "react";
import * as Maps from "@geobuff/maps";

import GameMapQuiz from "../../components/GameMapQuiz";
import GameSpinner from "../../components/GameSpinner";
import useQuiz from "../../hooks/UseQuiz";
import useMapping from "../../hooks/UseMapping";

interface Props {
  quizId: number;
}

const GameMapQuizContainer: FC<Props> = ({ quizId }) => {
  const { quiz, isLoading: isLoadingQuiz } = useQuiz(quizId);
  const { mapping, isLoading: isLoadingMapping } = useMapping(quizId);

  if (isLoadingQuiz || isLoadingMapping) {
    return <GameSpinner />;
  }

  return <GameMapQuiz quiz={quiz} mapping={mapping} map={Maps[quiz.mapSVG]} />;
};

export default GameMapQuizContainer;
