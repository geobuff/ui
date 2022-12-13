import React, { useContext } from "react";

import Head from "next/head";

import { LanguageContext } from "../context/LanguageContext/LanguageContext";

import OrdersContainer from "../containers/OrdersContainer";

import HeroHeader from "../components/HeroHeader";

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
      <HeroHeader heading={t.global.myOrders} />
      <OrdersContainer />
    </>
  );
}

Orders.requireAuth = true;
