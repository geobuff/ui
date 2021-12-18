import Head from "next/head";
import React, { FC, useRef } from "react";
import HeroHeader from "../../components/HeroHeader";
import MainView from "../../components/MainView";
import CheckoutFormContainer from "../../containers/CheckoutFormContainer";

const Checkout: FC = () => {
  const ref = useRef(null);

  return (
    <>
      <Head>
        <title>Checkout - GeoBuff</title>
      </Head>
      <MainView innerRef={ref}>
        <HeroHeader heading="Checkout" />
        <CheckoutFormContainer />
      </MainView>
    </>
  );
};

export default Checkout;
