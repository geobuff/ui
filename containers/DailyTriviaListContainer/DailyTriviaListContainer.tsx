import React, { FC } from "react";
import DailyTriviaList from "../../components/DailyTriviaList";
import useAllDailyTrivia from "../../hooks/UseAllDailyTrivia";

const DailyTriviaListContainer: FC = () => {
  const { data, isLoading } = useAllDailyTrivia();

  if (isLoading) {
    return null;
  }

  return <DailyTriviaList dailyTrivias={data} />;
};

export default DailyTriviaListContainer;
