import React from "react";

import GameSidebar, { Props } from "./GameSidebar";

export default {
  title: "UI/GameSidebar",
  component: GameSidebar,
};

const Template = (args: Props): React.ReactNode => <GameSidebar {...args} />;

export const Default = Template.bind({});

Default.args = {
  heading: "Countries of the World",
  quizId: 1,
  hasLeaderboard: true,
};
