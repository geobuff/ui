import React from "react";
import GameScoreInline from "./GameScoreInline";

export default {
  title: "UI/GameScoreInline",
  component: GameScoreInline,
};

const Template = (args) => <GameScoreInline {...args} />;

export const Default = Template.bind({});
Default.args = {
  score: 69,
  total: 193,
};
