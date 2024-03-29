import React, { FC, useContext } from "react";

import { HeroHeader } from "@geobuff/buff-ui/components";

import Head from "next/head";

import { LanguageContext } from "../../contexts/LanguageContext";

import MerchListContainer from "../../containers/MerchListContainer";

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
      <HeroHeader heading={t.global.merch} subtitle={t.merch.subtitle} />
      <MerchListContainer />
    </>
  );
};

export default Merch;
