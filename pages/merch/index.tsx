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
        content="Merch for every occasion. Cop one of our tees, socks, posters or stickers and let the squad know you're ready to drop those Countries of the World at a moments notice!"
      />
    </Head>
    <MainView>
      <HeroHeader
        heading="Merch"
        subtitle="Currently only available in New Zealand!"
      />
      <MerchListContainer />
    </MainView>
  </>
);

export default Merch;
