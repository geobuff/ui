import React, { FC, useEffect, useState } from "react";

import { GameSpinner } from "@geobuff/buff-ui/components";

import GameCommunityQuiz from "../../components/GameCommunityQuiz";

import axiosClient from "../../axios";
import { GetCommunityQuiz } from "../../types/get-community-quiz-dto";

export interface Props {
  quizId?: number;
}

const GameCommunityQuizContainer: FC<Props> = ({ quizId = 0 }) => {
  const [quiz, setQuiz] = useState<GetCommunityQuiz>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axiosClient
      .get(`/community-quizzes/${quizId}`)
      .then((response) => setQuiz(response.data))
      .catch((error) => setError(error.response.data))
      .finally(() => setIsLoading(false));
  }, []);

  const handleIncrementPlays = (quizId: number): void => {
    axiosClient.put(`/community-quiz-plays/${quizId}`);
  };

  if (isLoading) {
    return <GameSpinner />;
  }

  return (
    <GameCommunityQuiz
      quiz={quiz}
      error={error}
      onIncrementPlays={handleIncrementPlays}
    />
  );
};

export default GameCommunityQuizContainer;
