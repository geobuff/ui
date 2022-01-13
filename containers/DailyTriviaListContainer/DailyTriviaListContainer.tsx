import React, { FC } from "react";
import DailyTriviaList from "../../components/DailyTriviaList";
import useAllTrivia from "../../hooks/UseAllTrivia";
import QuizListPlaceholder from "../../placeholders/QuizListPlaceholder";

const DailyTriviaListContainer: FC = () => {
  const { data, isLoading } = useAllTrivia();

  if (isLoading) {
    return <QuizListPlaceholder noOfTiles={20} />;
  }

  return <DailyTriviaList trivia={data} />;
};

export default DailyTriviaListContainer;
