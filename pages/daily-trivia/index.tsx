import React, { FC } from "react";
import Head from "next/head";

import HeroHeader from "../../components/HeroHeader";
import { Flex } from "@chakra-ui/react";
import MainView from "../../components/MainView";
import DailyTriviaListContainer from "../../containers/DailyTriviaListContainer";

const DailyTrivia: FC = () => {
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
            padding={9}
            maxWidth={1400}
            width="100%"
            marginX="auto"
          >
            <DailyTriviaListContainer />
          </Flex>
        </Flex>
      </MainView>
    </>
  );
};

export default DailyTrivia;
