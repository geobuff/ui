import React, { FC } from "react";

import GameFlagQuiz from "../../components/GameFlagQuiz";
import useQuiz from "../../hooks/UseQuiz";
import useMapping from "../../hooks/UseMapping";
import GameSpinner from "../../components/GameSpinner";
import { FlagGameContextProvider } from "../../context/FlagGameContext";

interface Props {
  quizId: number;
}

const GameFlagQuizContainer: FC<Props> = ({ quizId }) => {
  const { quiz, isLoading: isLoadingQuiz } = useQuiz(quizId);
  const { mapping, isLoading: isLoadingMapping } = useMapping(quizId);

  if (isLoadingQuiz || isLoadingMapping) {
    return <GameSpinner />;
  }

  return (
    <FlagGameContextProvider>
      <GameFlagQuiz quiz={quiz} mapping={mapping} />
    </FlagGameContextProvider>
  );
};

export default GameFlagQuizContainer;
