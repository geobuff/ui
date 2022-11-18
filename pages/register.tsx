import React, { FC } from "react";

import { useBreakpointValue } from "@chakra-ui/react";
import Head from "next/head";

import RegisterContainer from "../containers/RegisterContainer";

import MainView from "../components/MainView";

import { FooterVariant } from "../types/footer-variant";

const Register: FC = () => {
  const backgroundColor = useBreakpointValue({ base: "#FFF", md: "#F0F0F0" });

  return (
    <>
      <Head>
        <title>Register - GeoBuff</title>
        <meta
          name="description"
          content="Sign up today to start using the world's leading competitive platform for geography-based trivia!"
        />
      </Head>

      <style jsx global>{`
        body {
          background: ${backgroundColor};
        }
      `}</style>

      <MainView hasNavigationBar={false} footerVariant={FooterVariant.SIMPLE}>
        <RegisterContainer />
      </MainView>
    </>
  );
};

export default Register;
