import React, { FC } from "react";
import Head from "next/head";

import MainView from "../../components/MainView";
import GameDailyTrivia from "../../components/GameDailyTrivia";

const DailyTrivia: FC = () => {
  return (
    <>
      <Head>
        <title> {"Daily Trivia - GeoBuff"}</title>
      </Head>
      <MainView hasFooter={false} backgroundColor="#276F86">
        <GameDailyTrivia />
      </MainView>
    </>
  );
};

export default DailyTrivia;
