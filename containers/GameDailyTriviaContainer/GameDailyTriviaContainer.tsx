import React, { FC } from "react";
import GameDailyTrivia from "../../components/GameDailyTrivia";
import useDailyTrivia from "../../hooks/UseDailyTrivia";

const GameDailyTriviaContainer: FC = () => {
  const { data, isLoading } = useDailyTrivia(
    new Date().toISOString().split("T")[0]
  );

  if (isLoading) {
    return null;
  }

  return <GameDailyTrivia questions={data} />;
};

export default GameDailyTriviaContainer;
