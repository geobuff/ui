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
        <meta
          name="description"
          content="Merch for every occasion. Cop one of our tees, socks, posters or stickers and let the squad know you're ready to drop those countries of the world at a moments notice!"
        />
      </Head>
      <MainView innerRef={ref}>
        <HeroHeader heading="Checkout" />
        <CheckoutFormContainer />
      </MainView>
    </>
  );
};

export default Checkout;
