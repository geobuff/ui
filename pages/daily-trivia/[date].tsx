import React, { FC, useContext, useEffect, useState } from "react";

import { DateTime } from "luxon";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

import { LanguageContext } from "../../contexts/LanguageContext";

import { DailyTriviaQuizContainer } from "../../containers";

import GameTrivia from "../../components/GameTrivia";

import axiosClient from "../../axios";
import { Trivia } from "../../types/trivia";

export interface Props {
  pageProps: {
    trivia: Trivia;
  };
}

const DailyTriviaQuiz: FC<Props> = ({ pageProps }) => {
  const router = useRouter();
  const { language } = useContext(LanguageContext);

  const [date, setDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const trivia = pageProps.trivia;

  useEffect(() => {
    if (language !== "en") {
      if (router.asPath !== router.route) {
        const date = router.query.date as string;
        setDate(date);
        setIsLoading(false);
      }
    }
  }, [router, language]);

  const handleIncrementPlays = (triviaId: number): void => {
    axiosClient.put(`/trivia-plays/${triviaId}`);
  };

  if (language === "en") {
    return (
      <GameTrivia trivia={trivia} onIncrementPlays={handleIncrementPlays} />
    );
  }

  return isLoading ? null : (
    <DailyTriviaQuizContainer
      date={date}
      onIncrementPlays={handleIncrementPlays}
    />
  );
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
