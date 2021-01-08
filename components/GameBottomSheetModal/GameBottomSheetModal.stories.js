import React from "react";
import GameBottomSheetModal from "./GameBottomSheetModal";

export default {
  title: "UI/GameBottomSheetModal",
  component: GameBottomSheetModal,
};

const recentCountries = [
  {
    code: "NZ",
    name: "New Zealand",
  },
  {
    code: "BR",
    name: "Brasil",
  },
  {
    code: "FR",
    name: "France",
  },
];

const Template = (args) => <GameBottomSheetModal {...args} />;

export const Default = Template.bind({});
Default.args = {
  recentCountries,
  hasGameStarted: true,
};
