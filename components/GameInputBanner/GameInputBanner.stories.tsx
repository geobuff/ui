import React from "react";
import GameInputBanner, { Props } from "./GameInputBanner";

export default {
  title: "UI/GameInputBanner",
  component: GameInputBanner,
};

const Template = (args: Props): React.ReactNode => (
  <GameInputBanner {...args} />
);

export const Default = Template.bind({});
Default.args = {
  type: 1,
  maxScore: 197,
  plural: "countries",
  time: 900,
  score: 69,
  errorMessage: "",
  expiryTimestamp: { minutes: 0, seconds: 0 },
  hasError: false,
  hasGameStarted: false,
  hasGameStopped: false,
  inputValue: "",
};
