import React, { FC, useContext, useEffect, useState } from "react";

import axios, { AxiosPromise } from "axios";
import { GetStaticProps } from "next";
import type { AppProps } from "next/app";

import { HomeContextProvider } from "../context/HomeContext/HomeContext";
import { LanguageContext } from "../context/LanguageContext/LanguageContext";

import { HomeContainer } from "../containers/HomeContainer/HomeContainer";

import axiosClient from "../axios";
import { CommunityQuiz } from "../types/community-quiz-dto";
import { CommunityQuizFilterDto } from "../types/community-quiz-filter-dto";
import { Quiz } from "../types/quiz";
import { QuizzesFilterDto } from "../types/quizzes-filter-dto";
import { Trivia } from "../types/trivia";
import { TriviaFilterDto } from "../types/trivia-filter-dto";

const quizzesFilter: QuizzesFilterDto = {
  filter: "",
  page: 0,
  limit: 15,
  orderByPopularity: false,
};

const getRequests = (language: string): AxiosPromise<any>[] => {
  const headers = {
    "Content-Language": language,
  };

  return [
    axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_URL}/quizzes/all`,
      headers,
      data: {
        ...quizzesFilter,
        filter: "map",
      },
    }),
    axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_URL}/quizzes/all`,
      headers,
      data: {
        ...quizzesFilter,
        filter: "flag",
      },
    }),
    axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_URL}/community-quizzes/all`,
      headers,
      data: {
        page: 0,
        limit: 15,
      },
    }),
    axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_URL}/trivia/all`,
      headers,
      data: {
        page: 0,
        limit: 10,
      },
    }),
  ];
};

const Home: FC<AppProps> = ({ pageProps }) => {
  const { language } = useContext(LanguageContext);

  const [mapQuizzes, setMapQuizzes] = useState<Quiz[]>();
  const [flagQuizzes, setFlagQuizzes] = useState<Quiz[]>();
  const [communityQuizzes, setCommunityQuizzes] = useState<CommunityQuiz[]>();
  const [trivia, setTrivia] = useState<Trivia[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (language !== "en") {
      const requests = getRequests(language);
      Promise.all(requests)
        .then((responses) => {
          setMapQuizzes(responses[0].data.quizzes);
          setFlagQuizzes(responses[1].data.quizzes);
          setCommunityQuizzes(responses[2].data.quizzes);
          setTrivia(responses[3].data.trivia);
        })
        .finally(() => setIsLoading(false));
    } else {
      setMapQuizzes(pageProps.mapQuizzes);
      setFlagQuizzes(pageProps.flagQuizzes);
      setCommunityQuizzes(pageProps.communityQuizzes);
      setTrivia(pageProps.trivia);
      setIsLoading(false);
    }
  }, []);

  return (
    <HomeContextProvider>
      <HomeContainer
        maps={mapQuizzes}
        flags={flagQuizzes}
        community={communityQuizzes}
        trivia={trivia}
        isLoading={isLoading}
      />
    </HomeContextProvider>
  );
};

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
