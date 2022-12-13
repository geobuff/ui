import React, { FC, useEffect, useState } from "react";

import { ChakraProvider } from "@chakra-ui/react";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { Router, useRouter } from "next/router";
import NProgress from "nprogress";
//nprogress module
import "nprogress/nprogress.css";

import { AppContextProvider } from "../context/AppContext";
import { CurrentUserContextProvider } from "../context/CurrentUserContext/CurrentUserContext";
import { LanguageContextProvider } from "../context/LanguageContext/LanguageContext";
import { ShoppingCartContextProvider } from "../context/ShoppingCartContext";

import { AuthErrorRedirect } from "../components/AuthErrorRedirect/AuthErrorRedirect";
import AuthGuard from "../components/AuthGuard";
import ClientOnly from "../components/ClientOnly";
import MainView from "../components/MainView";

import * as gtag from "../helpers/gtag";
//styles of nprogress
import "../styles/globals.css";
import theme from "../styles/theme";

const isAppMobile = process.env.NEXT_PUBLIC_APP_MODE === "mobile";

const SIMPLE_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

const NO_FOOTER_ROUTES = [
  "/community-quiz/[id]",
  "/quiz/[id]",
  "/daily-trivia/[date]",
];

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
  const { events, pathname } = useRouter();
  const [canonicalHref, setCanonicalHref] = useState("");

  useEffect(() => {
    setCanonicalHref(window.location.href);
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    events.on("routeChangeComplete", handleRouteChange);
    return () => {
      events.off("routeChangeComplete", handleRouteChange);
    };
  }, [events]);

  const content = (
    <MainView
      isSimplePage={SIMPLE_ROUTES.includes(pathname)}
      hasFooter={!NO_FOOTER_ROUTES.includes(pathname)}
    >
      <Component {...pageProps} />
    </MainView>
  );

  return (
    <>
      <Head>
        <title>GeoBuff - Get Your Geo Flex On</title>
        <meta
          name="description"
          content={
            "GeoBuff is NZ's leading platform for Geography education and trivia. Sign up today!"
          }
        />
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
            <LanguageContextProvider>
              <CurrentUserContextProvider>
                <ShoppingCartContextProvider>
                  <ClientOnly>
                    <AuthErrorRedirect>
                      {Component.requireAuth ? (
                        <AuthGuard>{content}</AuthGuard>
                      ) : (
                        content
                      )}
                    </AuthErrorRedirect>
                  </ClientOnly>
                </ShoppingCartContextProvider>
              </CurrentUserContextProvider>
            </LanguageContextProvider>
          </AppContextProvider>
        </ChakraProvider>
      </SessionProvider>
    </>
  );
};

export default MyApp;
