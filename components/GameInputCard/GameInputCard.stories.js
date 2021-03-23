import React from "react";
import GameInputCard from "./GameInputCard";

export default {
  title: "UI/GameInputCard",
  component: GameInputCard,
};

const recentCountries = [
  {
    code: "NZ",
    svgName: "New Zealand",
  },
  {
    code: "BR",
    svgName: "Brasil",
  },
  {
    code: "FR",
    svgName: "France",
  },
];

const Template = (args) => <GameInputCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  quiz: {},
  score: 69,
  total: 193,
  countries: recentCountries,
  hasGameStarted: true,
};
