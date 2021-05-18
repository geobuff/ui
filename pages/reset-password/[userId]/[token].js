import React from "react";
import Head from "next/head";

import MainView from "../../../components/MainView";
import ResetPasswordContainer from "../../../containers/ResetPasswordContainer";

const ResetPassword = () => {
  return (
    <MainView hasNavigationBar={false} footerVariant="simple">
      <Head>
        <title>Reset Password - GeoBuff</title>
      </Head>
      <ResetPasswordContainer />
    </MainView>
  );
};

export default ResetPassword;
