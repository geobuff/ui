import React, { FC, useContext } from "react";

import { HeroHeader } from "@geobuff/buff-ui/components";

import { Flex } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";

import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

import { TriviaListContainer } from "../../containers/TriviaListContainer/TriviaListContainer";

import TriviaList from "../../components/TriviaList";

import axiosClient from "../../axios";

const DailyTrivia: FC<AppProps> = ({ pageProps }) => {
  const { t, language } = useContext(LanguageContext);

  return (
    <>
      <Head>
        <title>{`${t.global.dailyTriviaUpper} - GeoBuff`}</title>
        <meta
          name="description"
          content="Ten questions covering everything geography - from maps and flags, to rivers and mountains, our famous daily trivia will keep you coming back every single day."
        />
      </Head>
      <HeroHeader heading={t.global.dailyTriviaUpper} />
      <Flex flex={1} width="100%">
        <Flex
          direction="column"
          padding={{ base: 0, md: 9 }}
          maxWidth={1400}
          width="100%"
          marginX="auto"
        >
          {language === "en" ? (
            <TriviaList trivia={pageProps?.trivia} />
          ) : (
            <TriviaListContainer />
          )}
        </Flex>
      </Flex>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data: triviaData } = await axiosClient.post(
    `${process.env.NEXT_PUBLIC_API_URL}/trivia/all`,
    {
      page: 0,
      limit: 30,
    }
  );

  if (!triviaData) {
    return {
      notFound: true,
    };
  }

  return {
    props: { trivia: triviaData.trivia },
  };
};

export default DailyTrivia;
