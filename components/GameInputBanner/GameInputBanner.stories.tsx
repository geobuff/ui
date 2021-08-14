import React from "react";
import GameInputBanner from "./GameInputBanner";

export default {
  title: "UI/GameInputBanner",
  component: GameInputBanner,
};

const Template = (args) => <GameInputBanner {...args} />;

export const Default = Template.bind({});
Default.args = {
  quiz: {},
  score: 69,
  total: 193,
  verb: "countries",
};
