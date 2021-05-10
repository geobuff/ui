import React from "react";
import Head from "next/head";

import MainView from "../components/MainView";
import LoginContainer from "../containers/LoginContainer";

const Login = () => {
  return (
    <>
      <Head>
        <title>Login - GeoBuff</title>
      </Head>
      <MainView hasNavigationBar={false} hasFooter={false}>
        <LoginContainer />
      </MainView>
    </>
  );
};

export default Login;