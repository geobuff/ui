import React from "react";
import "../styles/globals.css";
import PropTypes from "prop-types";
import { ChakraProvider } from "@chakra-ui/core";
import NavigationBar from "../components/NavigationBar";
import { Auth0Provider } from "use-auth0-hooks";

function MyApp({ Component, pageProps }) {
  return (
    <Auth0Provider
      domain="geobuff.au.auth0.com"
      clientId="jlTlLHPV62WJ8atB12xqY8fHhVD41CIB"
      redirectUri="http://localhost:3000"
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
