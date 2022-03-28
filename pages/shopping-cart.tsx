import React, { FC } from "react";
import Head from "next/head";

import MainView from "../components/MainView";
import HeroHeader from "../components/HeroHeader";
import ShoppingCartContainer from "../containers/ShoppingCartContainer";

const ShoppingCart: FC = () => (
  <>
    <Head>
      <title>Shopping Cart - GeoBuff</title>
      <meta
        name="description"
        content="Merch for every occasion. Cop one of our tees, socks, posters or stickers and let the squad know you're ready to drop those countries of the world at a moments notice!"
      />
    </Head>
    <MainView>
      <HeroHeader heading="Shopping Cart" />
      <ShoppingCartContainer />
    </MainView>
  </>
);

export default ShoppingCart;
