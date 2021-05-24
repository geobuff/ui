import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import { ChakraProvider } from "@chakra-ui/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import "../styles/globals.css";
import theme from "../styles/theme";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>GeoBuff - Get Your Geo Flex On</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ChakraProvider theme={theme}>
        <Elements stripe={stripePromise}>
          <Component {...pageProps} />
        </Elements>
      </ChakraProvider>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
};

export default MyApp;
