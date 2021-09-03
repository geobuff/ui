import React, { FC } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import LeaderboardContainer from "../containers/LeaderboardContainer";
import MainView from "../components/MainView";

const Leaderboard: FC = () => {
  const router = useRouter();
  const { quizId, rank } = router.query;

  return (
    <>
      <Head>
        <title>{"Leaderboard - GeoBuff"}</title>
      </Head>
      <MainView>
        <LeaderboardContainer
          defaultQuizId={quizId && (quizId as string)}
          rankParam={rank && (rank as string)}
        />
      </MainView>
    </>
  );
};

export default Leaderboard;
