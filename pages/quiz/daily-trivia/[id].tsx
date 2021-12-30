import React, { FC } from "react";
import Head from "next/head";

import MainView from "../../../components/MainView";
import GameDailyTriviaContainer from "../../../containers/GameDailyTriviaContainer";

const DailyTrivia: FC = () => {
  return (
    <>
      <Head>
        <title> {"Daily Trivia - GeoBuff"}</title>
      </Head>
      <MainView hasFooter={false} backgroundColor="#276F86">
        <GameDailyTriviaContainer />
      </MainView>
    </>
  );
};

export default DailyTrivia;
