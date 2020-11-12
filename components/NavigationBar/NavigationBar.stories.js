import React from "react";
import NavigationBar from "./NavigationBar";

export default {
  title: "UI/NavigationBar",
  component: NavigationBar,
};

const Template = (args) => <NavigationBar {...args} />;

export const Default = Template.bind({});
Default.args = {};
