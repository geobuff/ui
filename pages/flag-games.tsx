import React, { FC } from "react";
import type { AppProps } from "next/app";
import { GetStaticProps } from "next";
import Head from "next/head";
import { Flex } from "@chakra-ui/react";

import axiosClient from "../axios";
import HeroHeader from "../components/HeroHeader";
import MainView from "../components/MainView";
import QuizList from "../components/QuizList";

const DailyTrivia: FC<AppProps> = ({ pageProps }) => {
  return (
    <>
      <Head>
        <title> {"All Flag Games - GeoBuff"}</title>
      </Head>
      <MainView>
        <HeroHeader heading="All Flag Games" />
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
