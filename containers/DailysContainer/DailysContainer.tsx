import React, { FC } from "react";
import Dailys from "../../components/Dailys";
import useAllDailyTrivia from "../../hooks/UseAllDailyTrivia";

const DailysContainer: FC = () => {
  const { data, isLoading } = useAllDailyTrivia();

  if (isLoading) {
    return null;
  }

  return <Dailys dailys={data} />;
};

export default DailysContainer;
