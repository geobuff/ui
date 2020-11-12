import React from "react";
import "../styles/globals.css";
import PropTypes from "prop-types";
import { ChakraProvider } from "@chakra-ui/core";
import NavigationBar from "../components/NavigationBar";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <NavigationBar />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
};

export default MyApp;
