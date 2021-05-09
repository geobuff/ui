import React from "react";

import MainView from "../components/MainView";
import LoginContainer from "../containers/LoginContainer";

const Login = () => {
  return (
    <MainView hasNavigationBar={false} hasFooter={false}>
      <LoginContainer />
    </MainView>
  );
};

export default Login;
