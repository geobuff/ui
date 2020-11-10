import React from "react";

import Twemoji from "./Twemoji";

export default {
  title: "UI/Twemoji",
  component: Twemoji,
};

const Template = (args) => <Twemoji {...args} />;

export const Default = Template.bind({});

Default.args = {
  emoji: "👋",
  height: "56px",
  width: "56px",
};
