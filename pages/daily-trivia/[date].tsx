import { GetStaticPaths, GetStaticProps } from "next";
import React, { FC } from "react";
import { DateTime } from "luxon";

import axiosClient from "../../axios";
import { Trivia } from "../../types/trivia";

import GameTrivia from "../../components/GameTrivia";

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
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/trivia`);
  const trivia = await res.json();

  const paths = trivia.map(({ date }) => ({
    params: {
      date,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default DailyTriviaQuiz;
