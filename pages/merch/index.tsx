import React, { FC, useContext } from "react";
import Head from "next/head";

import MainView from "../../components/MainView";
import MerchListContainer from "../../containers/MerchListContainer";
import HeroHeader from "../../components/HeroHeader";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

const Merch: FC = () => {
  const { t } = useContext(LanguageContext);

  return (
    <>
      <Head>
        <title>{`${t.global.merch} - GeoBuff`}</title>
        <meta
          name="description"
          content="Merch for every occasion. Cop one of our tees, socks, posters or stickers and let the squad know you're ready to drop those Countries of the World at a moments notice!"
        />
      </Head>
      <MainView>
        <HeroHeader heading={t.global.merch} subtitle={t.merch.subtitle} />
        <MerchListContainer />
      </MainView>
    </>
  );
};

export default Merch;
