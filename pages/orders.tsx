import React from "react";

import Head from "next/head";

import OrdersContainer from "../containers/OrdersContainer";

import HeroHeader from "../components/HeroHeader";
import MainView from "../components/MainView";

export default function Orders(): JSX.Element {
  return (
    <>
      <Head>
        <title>My Orders - GeoBuff</title>
        <meta
          name="description"
          content="Check out the latest merch that you've copped from the GeoBuff store."
        />
      </Head>
      <MainView>
        <HeroHeader heading="My Orders" />
        <OrdersContainer />
      </MainView>
    </>
  );
}

Orders.requireAuth = true;
