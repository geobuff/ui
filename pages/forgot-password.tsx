import React, { FC, useContext } from "react";

import { useBreakpointValue } from "@chakra-ui/react";
import Head from "next/head";

import { LanguageContext } from "../context/LanguageContext/LanguageContext";

import ForgotPasswordContainer from "../containers/ForgotPasswordContainer";

import MainView from "../components/MainView";

import { FooterVariant } from "../types/footer-variant";

const ForgotPassword: FC = () => {
  const backgroundColor = useBreakpointValue({ base: "#FFF", md: "#F0F0F0" });
  const { t } = useContext(LanguageContext);

  return (
    <>
      <Head>
        <title>{`${t.forgotPassword.title}- GeoBuff`}</title>
        <meta
          name="description"
          content="Forgot your password? Not to worry, we've got you covered. Get a reset link sent to your email and we'll have you back in action in no time."
        />
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
