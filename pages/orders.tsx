import React, { useContext } from "react";

import Head from "next/head";

import { LanguageContext } from "../context/LanguageContext/LanguageContext";

import OrdersContainer from "../containers/OrdersContainer";

import HeroHeader from "../components/HeroHeader";
import MainView from "../components/MainView";

export default function Orders(): JSX.Element {
  const { t } = useContext(LanguageContext);

  return (
    <>
      <Head>
        <title>{`${t.global.myOrders} - GeoBuff`}</title>
        <meta
          name="description"
          content="Check out the latest merch that you've copped from the GeoBuff store."
        />
      </Head>
      <MainView>
        <HeroHeader heading={t.global.myOrders} />
        <OrdersContainer />
      </MainView>
    </>
  );
}

Orders.requireAuth = true;
