import React, { FC, useContext } from "react";
import type { AppProps } from "next/app";
import { GetStaticProps } from "next";
import Head from "next/head";
import { Flex } from "@chakra-ui/react";

import axiosClient from "../axios";
import HeroHeader from "../components/HeroHeader";
import MainView from "../components/MainView";
import QuizList from "../components/QuizList";
import { LanguageContext } from "../context/LanguageContext/LanguageContext";

const DailyTrivia: FC<AppProps> = ({ pageProps }) => {
  const { t } = useContext(LanguageContext);

  return (
    <>
      <Head>
        <title>{`${t.global.mapGamesUpper} - GeoBuff`}</title>
        <meta
          name="description"
          content="Rate yourself as a budding cartographer? Test your knowledge on our variety of interactive map games!"
        />
      </Head>
      <MainView>
        <HeroHeader heading={t.global.mapGamesUpper} />
        <Flex flex={1} width="100%">
          <Flex
            direction="column"
            padding={{ base: 0, md: 9 }}
            maxWidth={1400}
            width="100%"
            marginX="auto"
          >
            <QuizList quizzes={pageProps?.mapQuizzes} />
          </Flex>
        </Flex>
      </MainView>
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

export default DailyTrivia;
