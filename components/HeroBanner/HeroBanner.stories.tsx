import React from "react";
import HeroBanner from "./HeroBanner";

export default {
  title: "UI/HeroBanner",
  component: HeroBanner,
};

const Template = (args) => <HeroBanner {...args} />;

export const Default = Template.bind({});
Default.args = {
  username: "ScrubLord420",
};

export const NoName = Template.bind({});
NoName.args = {};
