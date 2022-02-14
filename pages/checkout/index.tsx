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
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&libraries=places`}
        ></script>
      </Head>
      <MainView innerRef={ref}>
        <HeroHeader heading="Checkout" />
        <CheckoutFormContainer />
      </MainView>
    </>
  );
};

export default Checkout;
