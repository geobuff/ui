import React, { FC } from "react";
import Head from "next/head";

import { useBreakpointValue } from "@chakra-ui/react";

import MainView from "../components/MainView";
import ForgotPasswordContainer from "../containers/ForgotPasswordContainer";
import { FooterVariant } from "../types/footer-variant";

const ForgotPassword: FC = () => {
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

      <MainView hasNavigationBar={false} footerVariant={FooterVariant.SIMPLE}>
        <ForgotPasswordContainer />
      </MainView>
    </>
  );
};

export default ForgotPassword;
