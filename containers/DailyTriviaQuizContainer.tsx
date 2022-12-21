import React, { FC } from "react";

import useTrivia from "../hooks/UseTrivia";

import GameSpinner from "../components/GameSpinner";
import GameTrivia from "../components/GameTrivia";

export interface DailyTriviaQuizContainerProps {
  date: string;
  onIncrementPlays: (triviaId: number) => void;
}

export const DailyTriviaQuizContainer: FC<DailyTriviaQuizContainerProps> = ({
  date,
  onIncrementPlays,
}) => {
  const { data, isLoading } = useTrivia(date);

  if (isLoading) {
    return <GameSpinner />;
  }

  return <GameTrivia trivia={data} onIncrementPlays={onIncrementPlays} />;
};
