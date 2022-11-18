import React, { FC } from "react";

import { DateTime } from "luxon";
import { GetStaticPaths, GetStaticProps } from "next";

import GameTrivia from "../../components/GameTrivia";

import axiosClient from "../../axios";
import { Trivia } from "../../types/trivia";

export interface Props {
  pageProps: {
    trivia: Trivia;
  };
}

const DailyTriviaQuiz: FC<Props> = ({ pageProps }) => {
  const trivia = pageProps.trivia;

  const handleIncrementPlays = (triviaId: number): void => {
    axiosClient.put(`/trivia-plays/${triviaId}`);
  };

  return <GameTrivia trivia={trivia} onIncrementPlays={handleIncrementPlays} />;
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { date } = params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/trivia/${date}`);
  const trivia = await res.json();

  return {
    props: {
      trivia,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: triviaData } = await axiosClient.post(
    `${process.env.NEXT_PUBLIC_API_URL}/trivia/all`,
    {
      page: 0,
      limit: 50,
    }
  );

  const paths = triviaData.trivia.map(({ date }) => ({
    params: {
      date: DateTime.fromISO(date).toFormat("yyyy-MM-dd"),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default DailyTriviaQuiz;
