import { SimpleGrid } from "@chakra-ui/react";
import Head from "next/head";
import React, { FC } from "react";
import MainView from "../components/MainView";
import AdminDashboardContainer from "../containers/AdminDashboardContainer";
import AdminQuizzesContainer from "../containers/AdminQuizzesContainer";
import AdminUsersContainer from "../containers/AdminUsersContainer";

const Admin: FC = () => (
  <>
    <Head>
      <title>{"Admin Dashboard - GeoBuff"}</title>
    </Head>
    <MainView>
      <AdminDashboardContainer />
      <SimpleGrid columns={{ base: 1, lg: 2 }}>
        <AdminUsersContainer />
        <AdminQuizzesContainer />
      </SimpleGrid>
    </MainView>
  </>
);

export default Admin;
