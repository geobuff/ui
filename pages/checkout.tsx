import Head from "next/head";
import React, { FC } from "react";
import HeroHeader from "../components/HeroHeader";
import MainView from "../components/MainView";

const Checkout: FC = () => (
  <>
    <Head>
      <title>Shopping Cart - GeoBuff</title>
    </Head>
    <MainView>
      <HeroHeader heading="Checkout" />
      Testing
    </MainView>
  </>
);

export default Checkout;
