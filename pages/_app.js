import React from "react";
import "../styles/globals.css";
import PropTypes from "prop-types";
import { ChakraProvider } from "@chakra-ui/core";
import NavigationBar from "../components/NavigationBar";
import { Auth0Provider } from "@auth0/auth0-react";

function MyApp({ Component, pageProps }) {
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENTID}
      redirectUri={process.env.NEXT_PUBLIC_REDIRECT_URI}
    >
      <ChakraProvider>
        <NavigationBar />
        <Component {...pageProps} />
      </ChakraProvider>
    </Auth0Provider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
};

export default MyApp;
