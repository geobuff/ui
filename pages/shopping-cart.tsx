import React, { FC } from "react";
import Head from "next/head";

import MainView from "../components/MainView";
import HeroHeader from "../components/HeroHeader";
import ShoppingCartContainer from "../containers/ShoppingCartContainer";

const ShoppingCart: FC = () => (
  <>
    <Head>
      <title>Shopping Cart - GeoBuff</title>
    </Head>
    <MainView>
      <HeroHeader heading="Shopping Cart" />
      <ShoppingCartContainer />
    </MainView>
  </>
);

export default ShoppingCart;
