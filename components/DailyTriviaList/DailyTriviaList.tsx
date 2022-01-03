import React, { FC } from "react";
import { Alert, AlertIcon, Link } from "@chakra-ui/react";
import { DailyTrivia } from "../../types/daily-trivia";

export interface Props {
  dailyTrivias?: DailyTrivia[];
}

const DailyTriviaList: FC<Props> = ({ dailyTrivias = [] }) => {
  if (dailyTrivias.length === 0) {
    return (
      <Alert status="info" borderRadius={6}>
        <AlertIcon />
        {`No daily trivia's to display.`}
      </Alert>
    );
  }

  return (
    <>
      {dailyTrivias.map((quiz) => (
        <Link key={quiz.id} href={`/daily-trivia/${quiz.date}`}>
          {quiz.name}
        </Link>
      ))}
    </>
  );
};

export default DailyTriviaList;
