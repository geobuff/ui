import React, { useEffect, FC, useContext } from "react";
import Head from "next/head";
import { Router, useRouter } from "next/router";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ChakraProvider } from "@chakra-ui/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { isMobile } from "react-device-detect";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress

import "../styles/globals.css";
import theme from "../styles/theme";
import * as gtag from "../helpers/gtag";

import { AppContextProvider } from "../context/AppContext";
import {
  CurrentUserContext,
  CurrentUserContextProvider,
} from "../context/CurrentUserContext";
import { ShoppingCartContextProvider } from "../context/ShoppingCartContext";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const isAppMobile = process.env.NEXT_PUBLIC_APP_MODE === "mobile";

interface Props {
  Component: any;
}

//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

NProgress.configure({ showSpinner: false });

const MyApp: FC<Props> = ({ Component, ...pageProps }) => {
  const router = useRouter();
  const {
    user,
    isLoading: isUserLoading,
    clearUser,
    tokenExpired,
  } = useContext(CurrentUserContext);

  useEffect(() => {
    if (!isUserLoading && user && tokenExpired(user.token)) {
      clearUser();
      router.push("/login");
    }
  }, [isUserLoading, user, tokenExpired, clearUser, router]);

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <title>GeoBuff - Get Your Geo Flex On</title>
        <meta
          name="description"
          content="GeoBuff is the world's leading competitive platform for geography-based trivia. Sign up today!"
        />
        <link rel="icon" href="/favicon.ico" />
        {isAppMobile && (
          <>
            <meta name="robots" content="noindex" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, maximum-scale=1"
            />
          </>
        )}

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
        <Elements stripe={stripePromise}>
          <DndProvider
            backend={isMobile ? TouchBackend : HTML5Backend}
            options={{ delayTouchStart: 5, ignoreContextMenu: true }}
          >
            <AppContextProvider>
              <CurrentUserContextProvider>
                <ShoppingCartContextProvider>
                  <Component {...pageProps} />
                </ShoppingCartContextProvider>
              </CurrentUserContextProvider>
            </AppContextProvider>
          </DndProvider>
        </Elements>
      </ChakraProvider>
    </>
  );
};

export default MyApp;
