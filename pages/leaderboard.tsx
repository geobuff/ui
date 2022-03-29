import React, { FC } from "react";
import { GetStaticProps } from "next";
import type { AppProps } from "next/app";

import { useRouter } from "next/router";
import Head from "next/head";

import LeaderboardContainer from "../containers/LeaderboardContainer";
import MainView from "../components/MainView";
import { QuizzesFilterDto } from "../types/quizzes-filter-dto";
import axiosClient from "../axios";

const Leaderboard: FC<AppProps> = ({ pageProps }) => {
  const router = useRouter();
  const { quizId, rank } = router.query;
  const { quizzes } = pageProps;

  return (
    <>
      <Head>
        <title>{"Leaderboard - GeoBuff"}</title>
        <meta
          name="description"
          content="Earn your place on the GeoBuff leaderboard! Every game features a competitive leaderboard so you can compete with your friends and foes from all over the world."
        />
      </Head>
      <MainView>
        <LeaderboardContainer
          defaultQuizId={quizId && (quizId as string)}
          rankParam={rank && (rank as string)}
          quizzes={quizzes}
        />
      </MainView>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const body: QuizzesFilterDto = {
    filter: "",
    page: 0,
    limit: 100,
    orderByPopularity: false,
  };

  const { data } = await axiosClient.post(
    `${process.env.NEXT_PUBLIC_API_URL}/quizzes/all`,
    body
  );

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      quizzes: data.quizzes,
    },
  };
};

export default Leaderboard;
