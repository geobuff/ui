import React from "react";
import { Quizzes } from "../../helpers/quizzes";
import GameInputBanner from "./GameInputBanner";

export default {
  title: "UI/GameInputBanner",
  component: GameInputBanner,
};

const Template = (args) => <GameInputBanner {...args} />;

export const Default = Template.bind({});
Default.args = {
  quiz: Quizzes.CountriesOfTheWorld,
  score: 69,
  total: 193,
  verb: "countries",
};
