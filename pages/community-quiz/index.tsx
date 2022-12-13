import React, { FC, useContext } from "react";

import { Flex } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Head from "next/head";

import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

import CommunityQuizListContainer from "../../containers/CommunityQuizListContainer";

import HeroHeader from "../../components/HeroHeader";

const CommunityQuiz: FC<AppProps> = () => {
  const { t } = useContext(LanguageContext);

  return (
    <>
      <Head>
        <title>{`${t.global.communityQuizzesUpper} - GeoBuff`}</title>
        <meta
          name="description"
          content="Think you've got what it takes to go head-to-head with our community of GeoBuff's? Test your knowledge with our collection of user generated quizzes!"
        />
      </Head>
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
    </>
  );
};

export default CommunityQuiz;
