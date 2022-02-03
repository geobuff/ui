import React, { FC } from "react";
import Head from "next/head";
import MainView from "../components/MainView";
import AdminContainer from "../containers/AdminContainer";

const Admin: FC = () => (
  <>
    <Head>
      <title>{"Admin Dashboard - GeoBuff"}</title>
    </Head>
    <MainView>
      <AdminContainer />
    </MainView>
  </>
);

export default Admin;
