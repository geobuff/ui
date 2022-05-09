import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import MerchSummaryContainer from "../../containers/MerchSummaryContainer";
import MainView from "../../components/MainView";
import HeroHeader from "../../components/HeroHeader";

const Summary: FC = () => {
  const router = useRouter();
  const [route, setRoute] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (router.asPath !== router.route) {
      const route = router.query.route as string;
      setRoute(route);
      setIsLoading(false);
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>Merch - GeoBuff</title>
        <meta
          name="description"
          content="Merch for every occasion. Cop one of our tees, socks, posters or stickers and let the squad know you're ready to drop those countries of the world at a moments notice!"
        />
      </Head>
      <MainView>
        <HeroHeader heading="Merch" />
        {isLoading ? null : <MerchSummaryContainer route={route} />}
      </MainView>
    </>
  );
};

export default Summary;
