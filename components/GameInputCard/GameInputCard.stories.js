import React from "react";
import GameInputCard from "./GameInputCard";

export default {
  title: "UI/GameInputCard",
  component: GameInputCard,
};

const Template = (args) => <GameInputCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  score: 69,
  total: 193,
  recentCountries: [],
};
