import React, { FC } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import MerchSummaryContainer from "../../containers/MerchSummaryContainer";
import MainView from "../../components/MainView";
import HeroHeader from "../../components/HeroHeader";

const Summary: FC = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>Merch - GeoBuff</title>
      </Head>
      <MainView>
        <HeroHeader heading="Merch" />
        <MerchSummaryContainer id={parseInt(id as string)} />
      </MainView>
    </>
  );
};

export default Summary;
