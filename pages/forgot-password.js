import React from "react";

import MainView from "../components/MainView";
import Head from "next/head";
import ForgotPasswordContainer from "../containers/ForgotPasswordContainer";

const ForgotPassword = () => {
  return (
    <MainView hasNavigationBar={false} footerVariant="simple">
      <Head>
        <title>Forgot Password - GeoBuff</title>
      </Head>
      <ForgotPasswordContainer />
    </MainView>
  );
};

export default ForgotPassword;
