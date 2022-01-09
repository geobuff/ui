import Head from "next/head";
import React, { FC } from "react";
import MainView from "../components/MainView";
import AdminDashboardContainer from "../containers/AdminDashboardContainer";

const Admin: FC = () => (
  <>
    <Head>
      <title>{"Admin Dashboard - GeoBuff"}</title>
    </Head>
    <MainView>
      <AdminDashboardContainer />
    </MainView>
  </>
);

export default Admin;
