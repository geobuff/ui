import React from "react";
import Head from "next/head";

import MainView from "../../components/MainView";
import MerchContainer from "../../containers/MerchContainer";
import HeroHeader from "../../components/HeroHeader";

const Merch = () => (
  <>
    <Head>
      <title>Merch - GeoBuff</title>
    </Head>
    <MainView>
      <HeroHeader heading="Merch" />
      <MerchContainer />
    </MainView>
  </>
);

export default Merch;
