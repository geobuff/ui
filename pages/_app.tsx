/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, FC } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ChakraProvider } from "@chakra-ui/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { isMobile } from "react-device-detect";

import "../styles/globals.css";
import theme from "../styles/theme";

import useCurrentUser from "../hooks/UseCurrentUser";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

interface Props {
  Component: any;
  [x: string]: any;
}

const MyApp: FC<Props> = ({ Component, ...pageProps }) => {
  const router = useRouter();
  const {
    user,
    isLoading: isUserLoading,
    clearUser,
    tokenExpired,
  } = useCurrentUser();

  useEffect(() => {
    if (!isUserLoading && user && tokenExpired(user.token)) {
      clearUser();
      router.push("/login");
    }
  }, [isUserLoading, user, tokenExpired, clearUser, router]);

  return (
    <>
      <Head>
        <title>GeoBuff - Get Your Geo Flex On</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/apple-touch-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/apple-touch-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-touch-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/apple-touch-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-touch-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-touch-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-touch-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon-180x180.png"
        />
      </Head>
      <ChakraProvider theme={theme}>
        <DndProvider
          backend={isMobile ? TouchBackend : HTML5Backend}
          options={{ delayTouchStart: 50, ignoreContextMenu: true }}
        >
          <Elements stripe={stripePromise}>
            <Component {...pageProps} />
          </Elements>
        </DndProvider>
      </ChakraProvider>
    </>
  );
};

export default MyApp;
