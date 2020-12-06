import React from "react";
import Sidebar from "./Sidebar";

export default {
  title: "UI/Sidebar",
  component: Sidebar,
};

const Template = (args) => <Sidebar {...args} />;

export const Default = Template.bind({});
Default.args = {
  heading: "Countries of the Wooooorld",
};
