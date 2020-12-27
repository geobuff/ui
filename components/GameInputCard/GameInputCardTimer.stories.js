import React from "react";
import GameInputCardTimer from "./GameInputCardTimer";

export default {
  title: "UI/GameInputCardTimer",
  component: GameInputCardTimer,
};

const time = new Date();
time.setSeconds(time.getSeconds() + 600); // 10 minutes timer

const Template = (args) => <GameInputCardTimer {...args} />;

export const Default = Template.bind({});
Default.args = {
  expiryTimestamp: null,
};
