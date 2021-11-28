import Head from "next/head";
import React, { FC } from "react";
import HeroHeader from "../components/HeroHeader";
import MainView from "../components/MainView";
import CheckoutFormContainer from "../containers/CheckoutFormContainer";

const Checkout: FC = () => (
  <>
    <Head>
      <title>Shopping Cart - GeoBuff</title>
    </Head>
    <MainView>
      <HeroHeader heading="Checkout" />
      <CheckoutFormContainer />
    </MainView>
  </>
);

export default Checkout;
