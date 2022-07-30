import React, { useEffect, FC, useState } from "react";
import Head from "next/head";
import { Router, useRouter } from "next/router";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress

import "../styles/globals.css";
import theme from "../styles/theme";
import * as gtag from "../helpers/gtag";

import { AppContextProvider } from "../context/AppContext";
import { ShoppingCartContextProvider } from "../context/ShoppingCartContext";
import { Session } from "next-auth";
import AuthGuard from "../components/AuthGuard";
import { CurrentUserContextProvider } from "../context/CurrentUserContext/CurrentUserContext";

const isAppMobile = process.env.NEXT_PUBLIC_APP_MODE === "mobile";

const defaultTitle = "GeoBuff - Get Your Geo Flex On";
const defaultDescription =
  "GeoBuff is NZ's leading platform for Geography education and trivia. Sign up today!";

interface Props {
  session: Session;
  Component: any;
}

//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

NProgress.configure({ showSpinner: false });

const MyApp: FC<Props> = ({ session, Component, ...pageProps }) => {
  const router = useRouter();
  const [title, setTitle] = useState(defaultTitle);
  const [description, setDescription] = useState(defaultDescription);
  const [canonicalHref, setCanonicalHref] = useState("");

  const updateTitleDescription = () => {
    switch (window.location.href) {
      case "https://www.geobuff.com":
      case "https://www.geobuff.com/":
        setTitle("GeoBuff - Get Your Geo Flex On!");
        setDescription(
          "GeoBuff is NZ's leading platform for Geography education and trivia. Sign up today..."
        );
        break;
      case "https://geobuff.com/":
        setTitle("GeoBuff - Get Your Geo Flex ON");
        setDescription(
          "GeoBuff is NZ's leading platform for Geography education and trivia. Sign up today."
        );
        break;
      default:
        setTitle(defaultTitle);
        setDescription(defaultDescription);
        break;
    }
  };

  useEffect(() => {
    setCanonicalHref(window.location.href);
    updateTitleDescription();
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
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={canonicalHref} />
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

        {isAppMobile ? (
          <>
            <meta name="robots" content="noindex" />
            <meta name="googlebot" content="noindex" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, maximum-scale=1"
            />
          </>
        ) : (
          <>
            <meta name="robots" content="all" />
            <meta name="googlebot" content="all" />
          </>
        )}
      </Head>
      <SessionProvider session={session}>
        <ChakraProvider theme={theme}>
          <AppContextProvider>
            <CurrentUserContextProvider>
              <ShoppingCartContextProvider>
                {Component.requireAuth ? (
                  <AuthGuard>
                    <Component {...pageProps} />
                  </AuthGuard>
                ) : (
                  <Component {...pageProps} />
                )}
              </ShoppingCartContextProvider>
            </CurrentUserContextProvider>
          </AppContextProvider>
        </ChakraProvider>
      </SessionProvider>
    </>
  );
};

export default MyApp;
