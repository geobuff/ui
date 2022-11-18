import React, { FC, useRef } from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js/pure";
import Head from "next/head";

import CheckoutFormContainer from "../../containers/CheckoutFormContainer";

import useScript from "../../hooks/UseScript";

import HeroHeader from "../../components/HeroHeader";
import MainView from "../../components/MainView";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const Checkout: FC = () => {
  const ref = useRef(null);
  const status = useScript(
    `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`
  );

  return (
    <>
      <Head>
        <title>Checkout - GeoBuff</title>
        <meta
          name="description"
          content="Add your details so we can ship you GeoBuff merch straight to your doorstep."
        />
      </Head>
      <MainView innerRef={ref}>
        <HeroHeader heading="Checkout" />
        <Elements stripe={stripePromise}>
          <CheckoutFormContainer isMapsApiLoading={status !== "ready"} />
        </Elements>
      </MainView>
    </>
  );
};

export default Checkout;
