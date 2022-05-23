import React, { FC } from "react";
import GameCommunityQuiz from "../../components/GameCommunityQuiz";
import axiosClient from "../../axios";
import useCommunityQuiz from "../../hooks/UseCommunityQuiz";
import GameSpinner from "../../components/GameSpinner";

export interface Props {
  quizId?: number;
}

const GameCommunityQuizContainer: FC<Props> = ({ quizId = 0 }) => {
  const { data, isLoading } = useCommunityQuiz(quizId);

  const handleIncrementPlays = (quizId: number): void => {
    axiosClient.put(`/community-quiz-plays/${quizId}`);
  };

  if (isLoading) {
    return <GameSpinner />;
  }

  return (
    <GameCommunityQuiz quiz={data} onIncrementPlays={handleIncrementPlays} />
  );
};

export default GameCommunityQuizContainer;
