import React, { FC } from "react";
import Head from "next/head";

import MainView from "../../components/MainView";
import MerchListContainer from "../../containers/MerchListContainer";
import HeroHeader from "../../components/HeroHeader";

const Merch: FC = () => (
  <>
    <Head>
      <title>Merch - GeoBuff</title>
    </Head>
    <MainView>
      <HeroHeader heading="Merch" />
      <MerchListContainer />
    </MainView>
  </>
);

export default Merch;
