import React, { FC } from "react";

import { GetStaticProps } from "next";
import type { AppProps } from "next/app";

import { HomeContextProvider } from "../context/HomeContext/HomeContext";

import { HomeContainer } from "../containers/HomeContainer/HomeContainer";

import axiosClient from "../axios";
import { CommunityQuizFilterDto } from "../types/community-quiz-filter-dto";
import { QuizzesFilterDto } from "../types/quizzes-filter-dto";
import { TriviaFilterDto } from "../types/trivia-filter-dto";

const Home: FC<AppProps> = ({ pageProps }) => (
  <HomeContextProvider>
    <HomeContainer pageProps={pageProps} />
  </HomeContextProvider>
);

export const getStaticProps: GetStaticProps = async () => {
  const quizzesFilter: QuizzesFilterDto = {
    filter: "",
    page: 0,
    limit: 15,
    orderByPopularity: false,
  };

  const { data: mapData } = await axiosClient.post(
    `${process.env.NEXT_PUBLIC_API_URL}/quizzes/all`,
    {
      ...quizzesFilter,
      filter: "map",
    }
  );

  const { data: flagData } = await axiosClient.post(
    `${process.env.NEXT_PUBLIC_API_URL}/quizzes/all`,
    {
      ...quizzesFilter,
      filter: "flag",
    }
  );

  const triviaFilter: TriviaFilterDto = {
    page: 0,
    limit: 10,
  };

  const { data: triviaData } = await axiosClient.post(
    `${process.env.NEXT_PUBLIC_API_URL}/trivia/all`,
    triviaFilter
  );

  const communityQuizFilter: CommunityQuizFilterDto = {
    page: 0,
    limit: 15,
  };

  const { data: communityQuizData } = await axiosClient.post(
    `${process.env.NEXT_PUBLIC_API_URL}/community-quizzes/all`,
    communityQuizFilter
  );

  if (!mapData && !flagData && !triviaData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      mapQuizzes: mapData.quizzes,
      flagQuizzes: flagData.quizzes,
      trivia: triviaData.trivia,
      communityQuizzes: communityQuizData.quizzes,
    },
  };
};

export default Home;
