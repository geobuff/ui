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
    <MainView>
      <HeroHeader heading="Merch" />
      {isLoading ? null : <MerchSummaryContainer route={route} />}
    </MainView>
  );
};

export default Summary;
