import React, { FC } from "react";
import DailyTriviaList from "../../components/DailyTriviaList";
import useAllDailyTrivia from "../../hooks/UseAllDailyTrivia";
import QuizListPlaceholder from "../../placeholders/QuizListPlaceholder";

const DailyTriviaListContainer: FC = () => {
  const { data, isLoading } = useAllDailyTrivia();

  if (isLoading) {
    return <QuizListPlaceholder noOfTiles={20} />;
  }

  return <DailyTriviaList dailyTrivias={data} />;
};

export default DailyTriviaListContainer;
