import React, { FC } from "react";

import { useBreakpointValue } from "@chakra-ui/react";
import Head from "next/head";

import LoginContainer from "../containers/LoginContainer";

import MainView from "../components/MainView";

import { FooterVariant } from "../types/footer-variant";

const Login: FC = () => {
  const backgroundColor = useBreakpointValue({ base: "#FFF", md: "#F0F0F0" });

  return (
    <>
      <Head>
        <title>Login - GeoBuff</title>
        <meta
          name="description"
          content="Login to GeoBuff to start building your geography knowledge using our variety of interactive map or flag games!"
        />
      </Head>

      <style jsx global>{`
        body {
          background: ${backgroundColor};
        }
      `}</style>

      <MainView hasNavigationBar={false} footerVariant={FooterVariant.SIMPLE}>
        <LoginContainer />
      </MainView>
    </>
  );
};

export default Login;
