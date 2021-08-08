import React from "react";
import Head from "next/head";

import { useBreakpointValue } from "@chakra-ui/react";

import MainView from "../../../components/MainView";
import ResetPasswordContainer from "../../../containers/ResetPasswordContainer";
import { FooterVariant } from "../../../models/footer-variant";

const ResetPassword = () => {
  const backgroundColor = useBreakpointValue({ base: "#FFF", md: "#F0F0F0" });

  // Stops page flickering while it figures out backgroundColor
  if (!backgroundColor) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Reset Password - GeoBuff</title>
      </Head>

      <style jsx global>{`
        body {
          background: ${backgroundColor};
        }
      `}</style>

      <MainView hasNavigationBar={false} footerVariant={FooterVariant.SIMPLE}>
        <ResetPasswordContainer />
      </MainView>
    </>
  );
};

export default ResetPassword;
