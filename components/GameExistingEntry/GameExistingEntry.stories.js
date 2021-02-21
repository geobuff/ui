import React from "react";
import GameExistingEntry from "./GameExistingEntry";

export default {
  title: "UI/GameExistingEntry",
  component: GameExistingEntry,
};

const Template = (args) => <GameExistingEntry {...args} />;

export const Default = Template.bind({});
Default.args = {
  //   quiz: Quizzes.CountriesOfTheWorld,
  //   score: 69,
  //   total: 193,
  //   countries: recentCountries,
  //   hasGameStarted: true,
};
