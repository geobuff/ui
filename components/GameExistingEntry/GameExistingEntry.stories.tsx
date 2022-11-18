import React from "react";

import GameExistingEntry, { Props } from "./GameExistingEntry";

export default {
  title: "UI/GameExistingEntry",
  component: GameExistingEntry,
};

const Template = (args: Props): React.ReactNode => (
  <GameExistingEntry {...args} />
);

export const Default = Template.bind({});

Default.args = {
  rank: 22943,
  score: 0,
  time: 900,
  username: "👑 KingKirb",
  isLoading: false,
};
