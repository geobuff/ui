import React from "react";
import LoginRedirect from "./LoginRedirect";

export default {
  title: "UI/LoginRedirect",
  component: LoginRedirect,
};

const Template = (args) => <LoginRedirect {...args} />;

export const Default = Template.bind({});
Default.args = {};
