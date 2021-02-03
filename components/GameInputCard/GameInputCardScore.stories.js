import React from "react";
import { Quizzes } from "../../helpers/quizzes";
import GameInputCardScore from "./GameInputCardScore";

export default {
  title: "UI/GameInputCardScore",
  component: GameInputCardScore,
};

const Template = (args) => <GameInputCardScore {...args} />;

export const Default = Template.bind({});
Default.args = {
  quiz: Quizzes.CountriesOfTheWorld,
  score: 69,
  total: 193,
};
