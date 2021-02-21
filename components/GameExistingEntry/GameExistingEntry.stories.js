import React from "react";
import GameExistingEntry from "./GameExistingEntry";

export default {
  title: "UI/GameExistingEntry",
  component: GameExistingEntry,
};

const Template = (args) => <GameExistingEntry {...args} />;

export const Default = Template.bind({});
Default.args = {
  rank: 22943,
  time: "15:00",
  score: 0,
  username: "👑 KingKirb",
};
