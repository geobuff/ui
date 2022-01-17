import React, { FC } from "react";
import TriviaList from "../../components/TriviaList";
import useAllTrivia from "../../hooks/UseAllTrivia";
import QuizListPlaceholder from "../../placeholders/QuizListPlaceholder";

const TriviaListContainer: FC = () => {
  const { data, isLoading } = useAllTrivia();

  if (isLoading) {
    return <QuizListPlaceholder noOfTiles={20} />;
  }

  return <TriviaList trivia={data} />;
};

export default TriviaListContainer;
