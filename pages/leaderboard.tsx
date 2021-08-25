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
          defaultQuizId={quizId && quizId[0]}
          rankParam={rank && rank[0]}
        />
      </MainView>
    </>
  );
};

export default Leaderboard;
