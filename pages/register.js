import Head from "next/head";
import React from "react";

import MainView from "../components/MainView";
import RegisterContainer from "../containers/RegisterContainer";

const Register = () => {
  return (
    <MainView hasNavigationBar={false} footerVariant="simple">
      <Head>
        <title>Register - GeoBuff</title>
      </Head>
      <RegisterContainer />
    </MainView>
  );
};

export default Register;
