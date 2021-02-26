import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";

import { ChakraProvider } from "@chakra-ui/react";
import { Auth0Provider } from "@auth0/auth0-react";

import "../styles/globals.css";
import theme from "../styles/theme";
import NavigationBar from "../components/NavigationBar";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>GeoBuff</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Auth0Provider
        domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
        clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENTID}
        redirectUri={process.env.NEXT_PUBLIC_REDIRECT_URI}
      >
        <ChakraProvider theme={theme}>
          <NavigationBar />
          <Component {...pageProps} />
        </ChakraProvider>
      </Auth0Provider>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
};

export default MyApp;
