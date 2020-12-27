import React from "react";
import GameInputCardScore from "./GameInputCardScore";

export default {
  title: "UI/GameInputCardScore",
  component: GameInputCardScore,
};

const Template = (args) => <GameInputCardScore {...args} />;

export const Default = Template.bind({});
Default.args = {
  score: 69,
  total: 193,
};
