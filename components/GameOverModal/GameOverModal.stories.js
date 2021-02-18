import React from "react";
import GameOverModal from "./GameOverModal";

export default {
  title: "UI/GameOverModal",
  component: GameOverModal,
};

const Template = (args) => <GameOverModal {...args} />;

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  onClose: () => {},
  time: "15:00",
  score: 69,
  total: 197,
};
