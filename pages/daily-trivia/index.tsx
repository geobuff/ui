import React, { FC } from "react";
import type { AppProps } from "next/app";
import { GetStaticProps } from "next";
import Head from "next/head";
import { Flex } from "@chakra-ui/react";

import HeroHeader from "../../components/HeroHeader";
import MainView from "../../components/MainView";

import TriviaList from "../../components/TriviaList";
import axiosClient from "../../axios";

const DailyTrivia: FC<AppProps> = ({ pageProps }) => {
  return (
    <>
      <Head>
        <title> {"Daily Trivia - GeoBuff"}</title>
      </Head>
      <MainView>
        <HeroHeader heading="Daily Trivia" />
        <Flex flex={1} width="100%">
          <Flex
            direction="column"
            padding={{ base: 0, md: 9 }}
            maxWidth={1400}
            width="100%"
            marginX="auto"
          >
            <TriviaList trivia={pageProps?.trivia} />
          </Flex>
        </Flex>
      </MainView>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data: trivia } = await axiosClient.post(
    `${process.env.NEXT_PUBLIC_API_URL}/trivia/all`,
    {
      page: 0,
      limit: 30,
    }
  );

  if (!trivia) {
    return {
      notFound: true,
    };
  }

  return {
    props: { trivia: trivia.trivia },
  };
};

export default DailyTrivia;
