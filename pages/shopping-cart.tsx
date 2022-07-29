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
        content="Add or remove items before checking out and paying for your GeoBuff merch."
      />
    </Head>
    <MainView>
      <HeroHeader heading="Shopping Cart" />
      <ShoppingCartContainer />
    </MainView>
  </>
);

export default ShoppingCart;
