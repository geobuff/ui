import Head from "next/head";
import React, { FC, useRef } from "react";
import HeroHeader from "../../components/HeroHeader";
import MainView from "../../components/MainView";
import CheckoutFormContainer from "../../containers/CheckoutFormContainer";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js/pure";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

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
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        />
      </Head>
      <MainView innerRef={ref}>
        <HeroHeader heading="Checkout" />
        <Elements stripe={stripePromise}>
          <CheckoutFormContainer />
        </Elements>
      </MainView>
    </>
  );
};

export default Checkout;
