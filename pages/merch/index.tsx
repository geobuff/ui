import React, { FC } from "react";
import Head from "next/head";

import MainView from "../../components/MainView";
import MerchListContainer from "../../containers/MerchListContainer";
import HeroHeader from "../../components/HeroHeader";

const Merch: FC = () => (
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
      <MerchListContainer />
    </MainView>
  </>
);

export default Merch;
