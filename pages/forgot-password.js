import React from "react";
import Head from "next/head";

import { useBreakpointValue } from "@chakra-ui/react";

import MainView from "../components/MainView";
import ForgotPasswordContainer from "../containers/ForgotPasswordContainer";

const ForgotPassword = () => {
  const backgroundColor = useBreakpointValue({ base: "#FFF", md: "#F0F0F0" });

  // Stops page flickering while it figures out backgroundColor
  if (!backgroundColor) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Forgot Password - GeoBuff</title>
      </Head>

      <style jsx global>{`
        body {
          background: ${backgroundColor};
        }
      `}</style>

      <MainView hasNavigationBar={false} footerVariant="simple">
        <ForgotPasswordContainer />
      </MainView>
    </>
  );
};

export default ForgotPassword;
