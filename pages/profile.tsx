import React, { useEffect, FC } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import UserProfileContainer from "../containers/UserProfileContainer";
import MainView from "../components/MainView";
import useCurrentUser from "../hooks/UseCurrentUser";

const Profile: FC = () => {
  const router = useRouter();

  const {
    user,
    isLoading: isUserLoading,
    clearUser,
    tokenExpired,
  } = useCurrentUser();

  useEffect(() => {
    if (!isUserLoading && user && tokenExpired(user.token)) {
      clearUser();
      router.push("/login");
    }
  }, [isUserLoading, user, tokenExpired, clearUser, router]);

  return (
    <>
      <Head>
        <title>Profile - GeoBuff</title>
      </Head>
      <MainView>
        <UserProfileContainer />;
      </MainView>
    </>
  );
};

export default Profile;
