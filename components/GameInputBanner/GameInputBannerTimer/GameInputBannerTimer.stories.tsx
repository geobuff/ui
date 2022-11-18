import React from "react";

import GameInputBannerTimer, { Props } from "./GameInputBannerTimer";

export default {
  title: "UI/GameInputBannerTimer",
  component: GameInputBannerTimer,
};

const Template = (args: Props): React.ReactNode => (
  <GameInputBannerTimer {...args} />
);

export const Default = Template.bind({});

Default.args = {
  totalSeconds: 900,
  expiryTimestamp: { minutes: 15, seconds: 0 },
  hasGameStarted: false,
  hasGameStopped: false,
};
