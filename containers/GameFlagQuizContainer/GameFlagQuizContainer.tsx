import React, { FC } from "react";

import GameFlagQuiz from "../../components/GameFlagQuiz";
import useQuiz from "../../hooks/UseQuiz";
import useMapping from "../../hooks/UseMapping";
import GameSpinner from "../../components/GameSpinner";

interface Props {
  quizId: number;
}

const GameFlagQuizContainer: FC<Props> = ({ quizId }) => {
  const { quiz, isLoading: isLoadingQuiz } = useQuiz(quizId);
  const { mapping, isLoading: isLoadingMapping } = useMapping(quizId);

  if (isLoadingQuiz || isLoadingMapping) {
    return <GameSpinner />;
  }

  return <GameFlagQuiz quiz={quiz} mapping={mapping} />;
};

export default GameFlagQuizContainer;
