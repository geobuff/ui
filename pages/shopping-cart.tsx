import React, { FC, useContext } from "react";

import Head from "next/head";

import { LanguageContext } from "../context/LanguageContext/LanguageContext";

import ShoppingCartContainer from "../containers/ShoppingCartContainer";

import HeroHeader from "../components/HeroHeader";

const ShoppingCart: FC = () => {
  const { t } = useContext(LanguageContext);

  return (
    <>
      <Head>
        <title>{`${t.global.shoppingCart} - GeoBuff`}</title>
        <meta
          name="description"
          content="Add or remove items before checking out and paying for your GeoBuff merch."
        />
      </Head>
      <HeroHeader heading={t.global.shoppingCart} />
      <ShoppingCartContainer />
    </>
  );
};
export default ShoppingCart;
