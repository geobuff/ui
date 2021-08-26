import React from "react";
import GameInputBannerError from "./GameInputBannerError";

export default {
  title: "UI/GameInputBannerError",
  component: GameInputBannerError,
};

const Template = (args) => <GameInputBannerError {...args} />;

export const Default = Template.bind({});
Default.args = {
  errorMessage: "Australia has already been selected!",
};
