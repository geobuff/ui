import React from "react";
import Head from "next/head";

import UserProfileContainer from "../containers/UserProfileContainer";
import MainView from "../components/MainView";

const Profile = () => (
  <>
    <Head>
      <title>Profile - GeoBuff</title>
    </Head>
    <MainView>
      <UserProfileContainer />;
    </MainView>
  </>
);

export default Profile;
