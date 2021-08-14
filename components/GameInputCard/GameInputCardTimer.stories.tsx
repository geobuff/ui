import React from "react";
import GameInputCardTimer from "./GameInputCardTimer";

export default {
  title: "UI/GameInputCardTimer",
  component: GameInputCardTimer,
};

const tenMinutesFromNow = new Date().setSeconds(new Date().getSeconds() + 600);
const tenSecondsFromNow = new Date().setSeconds(new Date().getSeconds() + 10);

const Template = (args) => <GameInputCardTimer {...args} />;

export const Default = Template.bind({});
Default.args = {
  expiryTimestamp: tenMinutesFromNow,
  onExpire: () => alert("Timers up!"),
};

export const TenSeconds = Template.bind({});
TenSeconds.args = {
  expiryTimestamp: tenSecondsFromNow,
  onExpire: () => alert("Timers up!"),
};
