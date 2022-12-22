import React, { FC } from "react";

import { GameSpinner } from "@geobuff/buff-ui/components";

import { useMappingEntries } from "../../hooks/UseMappingEntries";
import { useQuiz } from "../../hooks/UseQuiz";

import { GameQuiz } from "../../components/GameQuiz/GameQuiz";

interface Props {
  quizRoute: string;
  mappingKey: string;
}

export const GameQuizContainer: FC<Props> = ({ quizRoute, mappingKey }) => {
  const { data: quiz, isLoading: isQuizLoading } = useQuiz(quizRoute);
  const { data: mapping, isLoading: isMappingLoading } =
    useMappingEntries(mappingKey);

  if (isMappingLoading || isQuizLoading) {
    return <GameSpinner />;
  }

  return <GameQuiz quiz={quiz} mapping={mapping} />;
};
