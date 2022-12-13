import React, { FC, useContext } from "react";

import { Flex } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";

import { LanguageContext } from "../context/LanguageContext/LanguageContext";

import { QuizListContainer } from "../containers/QuizListContainer/QuizListContainer";

import HeroHeader from "../components/HeroHeader";
import QuizList from "../components/QuizList";

import axiosClient from "../axios";

const MapGames: FC<AppProps> = ({ pageProps }) => {
  const { t, language } = useContext(LanguageContext);

  return (
    <>
      <Head>
        <title>{`${t.global.mapGamesUpper} - GeoBuff`}</title>
        <meta
          name="description"
          content="Rate yourself as a budding cartographer? Test your knowledge on our variety of interactive map games!"
        />
      </Head>
      <HeroHeader heading={t.global.mapGamesUpper} />
      <Flex flex={1} width="100%">
        <Flex
          direction="column"
          padding={{ base: 0, md: 9 }}
          maxWidth={1400}
          width="100%"
          marginX="auto"
        >
          {language === "en" ? (
            <QuizList quizzes={pageProps?.mapQuizzes} />
          ) : (
            <QuizListContainer type="map" />
          )}
        </Flex>
      </Flex>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data: mapData } = await axiosClient.post(
    `${process.env.NEXT_PUBLIC_API_URL}/quizzes/all`,
    {
      page: 0,
      limit: 150,
      filter: "map",
    }
  );

  if (!mapData) {
    return {
      notFound: true,
    };
  }

  return {
    props: { mapQuizzes: mapData.quizzes },
  };
};

export default MapGames;
