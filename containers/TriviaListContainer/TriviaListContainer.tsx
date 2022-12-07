import React, { FC } from "react";

import { useAllTrivia } from "../../hooks/UseAllTrivia";

import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import TriviaList from "../../components/TriviaList";

export const TriviaListContainer: FC = () => {
  const { data, isLoading } = useAllTrivia();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <TriviaList trivia={data} />;
};
