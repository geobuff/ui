import React, { FC, useContext } from "react";

import { Flex } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";

import { LanguageContext } from "../context/LanguageContext/LanguageContext";

import HeroHeader from "../components/HeroHeader";
import MainView from "../components/MainView";
import QuizList from "../components/QuizList";

import axiosClient from "../axios";

const DailyTrivia: FC<AppProps> = ({ pageProps }) => {
  const { t } = useContext(LanguageContext);

  return (
    <>
      <Head>
        <title>{`${t.global.flagGamesUpper} - GeoBuff`}</title>
        <meta
          name="description"
          content="Call yourself a flag enthusiast? Test your knowledge on our variety of interactive flag games!"
        />
      </Head>
      <MainView>
        <HeroHeader heading={t.global.flagGamesUpper} />
        <Flex flex={1} width="100%">
          <Flex
            direction="column"
            padding={{ base: 0, md: 9 }}
            maxWidth={1400}
            width="100%"
            marginX="auto"
          >
            <QuizList quizzes={pageProps?.flagQuizzes} />
          </Flex>
        </Flex>
      </MainView>
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

export default DailyTrivia;
