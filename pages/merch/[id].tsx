import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import MerchSummaryContainer from "../../containers/MerchSummaryContainer";
import MainView from "../../components/MainView";
import HeroHeader from "../../components/HeroHeader";

const Summary: FC = () => {
  const router = useRouter();
  const [merchId, setMerchId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (router.asPath !== router.route) {
      const merchId = router.query.id as string;
      setMerchId(parseInt(merchId));
      setIsLoading(false);
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>Merch - GeoBuff</title>
      </Head>
      <MainView>
        <HeroHeader heading="Merch" />
        {isLoading ? null : <MerchSummaryContainer id={merchId} />}
      </MainView>
    </>
  );
};

export default Summary;
