import React from "react";
import { Quizzes } from "../../helpers/quizzes";
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
  quiz: Quizzes.CountriesOfTheWorld,
  score: 69,
  total: 193,
  countries: recentCountries,
  hasGameStarted: true,
};
