import React, { FC } from "react";
import Head from "next/head";

import { Flex } from "@chakra-ui/react";
import GameDailyTrivia from "../../components/GameDailyTrivia";
import GameSpinner from "../../components/GameSpinner";
import MainView from "../../components/MainView";
import useDailyTrivia from "../../hooks/UseDailyTrivia";

const GameDailyTriviaContainer: FC = () => {
  const { data, isLoading } = useDailyTrivia(
    new Date().toISOString().split("T")[0]
  );

  // TODO: Remove loading logic when converting page to static
  if (isLoading) {
    return (
      <>
        <Head>
          <title> {`${"Daily Trivia"} - GeoBuff`}</title>
        </Head>
        <MainView hasFooter={false} backgroundColor="#276F86">
          <Flex
            flex={1}
            direction="column"
            height="100%"
            width="100%"
            maxWidth={1300}
            padding={5}
            marginLeft="auto"
            marginRight="auto"
          >
            <GameSpinner />
          </Flex>
        </MainView>
      </>
    );
  }

  return <GameDailyTrivia trivia={data} />;
};

export default GameDailyTriviaContainer;
