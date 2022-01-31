import { Flex, SimpleGrid, Stack } from "@chakra-ui/react";
import Head from "next/head";
import React, { FC } from "react";
import MainView from "../components/MainView";
import AdminQuizzesContainer from "../containers/AdminQuizzesContainer";
import AdminUsersContainer from "../containers/AdminUsersContainer";
import AdminTotalUserCountContainer from "../containers/AdminTotalUserCountContainer";
import AdminDiscountsContainer from "../containers/AdminDiscountsContainer";
import AdminTopFiveQuizPlaysContainer from "../containers/AdminTopFiveQuizPlaysContainer";
import AdminLastFiveTriviaPlaysContainer from "../containers/AdminLastFiveTriviaPlaysContainer";
import AdminOrdersContainer from "../containers/AdminOrdersContainer";

const Admin: FC = () => (
  <>
    <Head>
      <title>{"Admin Dashboard - GeoBuff"}</title>
    </Head>
    <MainView>
      <Flex justifyContent="center">
        <Flex direction="column" height="100%" width="100%" maxWidth={1300}>
          <AdminTotalUserCountContainer />
          <AdminTopFiveQuizPlaysContainer />
          <AdminLastFiveTriviaPlaysContainer />
          <AdminUsersContainer />
          <AdminQuizzesContainer />
          <AdminOrdersContainer />
          <AdminDiscountsContainer />
        </Flex>
      </Flex>
    </MainView>
  </>
);

export default Admin;
