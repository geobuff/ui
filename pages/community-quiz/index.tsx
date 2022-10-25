import React, { FC, useContext } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Flex } from "@chakra-ui/react";

import HeroHeader from "../../components/HeroHeader";
import MainView from "../../components/MainView";

import CommunityQuizListContainer from "../../containers/CommunityQuizListContainer";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

const CommunityQuiz: FC<AppProps> = () => {
  const { t } = useContext(LanguageContext);
  return (
    <>
      <Head>
        <title> {"Community Quizzes - GeoBuff"}</title>
        <meta
          name="description"
          content="Think you've got what it takes to go head-to-head with our community of GeoBuff's? Test your knowledge with our collection of user generated quizzes!"
        />
      </Head>
      <MainView>
        <HeroHeader heading={t.global.communityQuizzesUpper} />
        <Flex flex={1} width="100%">
          <Flex
            direction="column"
            padding={{ base: 0, md: 9 }}
            maxWidth={1400}
            width="100%"
            marginX="auto"
          >
            <CommunityQuizListContainer />
          </Flex>
        </Flex>
      </MainView>
    </>
  );
};

export default CommunityQuiz;
