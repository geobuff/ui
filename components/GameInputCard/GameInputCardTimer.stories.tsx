import React from "react";
import { useTimer } from "react-timer-hook";
import GameInputCardTimer, { Props } from "./GameInputCardTimer";

export default {
  title: "UI/GameInputCardTimer",
  component: GameInputCardTimer,
};

const Template = (args: Props): React.ReactNode => (
  <GameInputCardTimer {...args} />
);

export const Default = Template.bind({});

Default.args = {
  totalSeconds: 900,
  expiryTimestamp: { minutes: 15, seconds: 0 },
  hasGameStarted: false,
  hasGameStopped: false,
};
