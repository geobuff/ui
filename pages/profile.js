import React from "react";
import Head from "next/head";

import UserProfileContainer from "../containers/UserProfileContainer";
import MainView from "../components/MainView";

const Profile = () => (
  <MainView>
    <Head>
      <title>Profile - GeoBuff</title>
    </Head>
    <UserProfileContainer />;
  </MainView>
);

export default Profile;
