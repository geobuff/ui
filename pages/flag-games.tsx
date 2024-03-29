import React, { FC, useContext } from "react";

import { HeroHeader } from "@geobuff/buff-ui/components";

import { Flex } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";

import { LanguageContext } from "../contexts/LanguageContext";

import { QuizListContainer } from "../containers/QuizListContainer/QuizListContainer";

import QuizList from "../components/QuizList";

import axiosClient from "../axios";

const FlagGames: FC<AppProps> = ({ pageProps }) => {
  const { t, language } = useContext(LanguageContext);

  return (
    <>
      <Head>
        <title>{`${t.global.flagGamesUpper} - GeoBuff`}</title>
        <meta
          name="description"
          content="Call yourself a flag enthusiast? Test your knowledge on our variety of interactive flag games!"
        />
      </Head>
      <HeroHeader heading={t.global.flagGamesUpper} />
      <Flex flex={1} width="100%">
        <Flex
          direction="column"
          padding={{ base: 0, md: 9 }}
          maxWidth={1400}
          width="100%"
          marginX="auto"
        >
          {language === "en" ? (
            <QuizList quizzes={pageProps?.flagQuizzes} />
          ) : (
            <QuizListContainer type="flag" />
          )}
        </Flex>
      </Flex>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data: flagData } = await axiosClient.post(
    `${process.env.NEXT_PUBLIC_API_URL}/quizzes/all`,
    {
      page: 0,
      limit: 100,
      filter: "Flag",
    }
  );

  if (!flagData) {
    return {
      notFound: true,
    };
  }

  return {
    props: { flagQuizzes: flagData.quizzes },
  };
};

export default FlagGames;
