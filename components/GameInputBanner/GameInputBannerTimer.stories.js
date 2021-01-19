import React from "react";
import GameInputBannerTimer from "./GameInputBannerTimer";

export default {
  title: "UI/GameInputBannerTimer",
  component: GameInputBannerTimer,
};

const tenMinutesFromNow = new Date().setSeconds(new Date().getSeconds() + 600);
const tenSecondsFromNow = new Date().setSeconds(new Date().getSeconds() + 10);

const Template = (args) => <GameInputBannerTimer {...args} />;

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
