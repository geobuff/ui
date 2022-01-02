import React, { FC } from "react";
import { Link } from "@chakra-ui/react";
import { DailyTrivia } from "../../types/daily-trivia";

export interface Props {
  dailys?: DailyTrivia[];
}

const Dailys: FC<Props> = ({ dailys = [] }) => {
  return (
    <>
      {dailys.map((quiz) => (
        <Link key={quiz.id} href={`/daily-trivia/${quiz.date}`}>
          {quiz.name}
        </Link>
      ))}
    </>
  );
};

export default Dailys;
