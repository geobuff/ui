import React, { FC } from "react";
import Head from "next/head";

import HeroHeader from "../../components/HeroHeader";
import { Box, Flex } from "@chakra-ui/react";
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
        <Box background="white">
          <Flex
            direction="column"
            maxWidth={{ base: "80%", md: "50%" }}
            mx="auto"
            py={9}
            fontSize={{ base: "12px", md: "inherit" }}
            justifyContent="center"
          >
            <DailyTriviaListContainer />
          </Flex>
        </Box>
      </MainView>
    </>
  );
};

export default DailyTrivia;
