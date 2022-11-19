import React from "react";

import GameInputCardScore, { Props } from "./GameInputCardScore";

export default {
  title: "UI/GameInputCardScore",
  component: GameInputCardScore,
};

const Template = (args: Props): React.ReactNode => (
  <GameInputCardScore {...args} />
);

export const Default = Template.bind({});

Default.args = {
  score: 69,
  maxScore: 197,
};
