import React, { FC, useContext, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import MainView from "../../components/MainView";
import UserProfileContainer from "../../containers/UserProfileContainer";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

const Profile: FC = () => {
  const router = useRouter();
  const { t } = useContext(LanguageContext);

  const [userId, setUserId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (router.asPath !== router.route) {
      const userId = router.query.userId as string;
      setUserId(parseInt(userId));
      setIsLoading(false);
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>{`${t.global.profile} - GeoBuff`}</title>
        <meta
          name="description"
          content="The one-stop shop to check out your badges, leaderboard entries, created quizzes and more."
        />
      </Head>
      <MainView>
        {isLoading ? null : <UserProfileContainer routeId={userId} />}
      </MainView>
    </>
  );
};

export default Profile;
