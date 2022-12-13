import React, { FC, useContext, useRef } from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js/pure";
import Head from "next/head";

import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

import CheckoutFormContainer from "../../containers/CheckoutFormContainer";

import useScript from "../../hooks/UseScript";

import HeroHeader from "../../components/HeroHeader";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const Checkout: FC = () => {
  const { t } = useContext(LanguageContext);

  const status = useScript(
    `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`
  );

  return (
    <>
      <Head>
        <title>{`${t.global.checkout} - GeoBuff`}</title>
        <meta
          name="description"
          content="Add your details so we can ship you GeoBuff merch straight to your doorstep."
        />
      </Head>
      <HeroHeader heading={t.global.checkout} />
      <Elements stripe={stripePromise}>
        <CheckoutFormContainer isMapsApiLoading={status !== "ready"} />
      </Elements>
    </>
  );
};

export default Checkout;
