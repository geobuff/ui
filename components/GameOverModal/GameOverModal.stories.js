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

export const ExistingEntry = Template.bind({});

ExistingEntry.args = {
  isOpen: true,
  onClose: () => {},
  time: "15:00",
  score: 69,
  total: 197,
  existingEntry: {
    rank: 22000,
    score: 103,
    time: "15:00",
    username: "PhileasFogg",
    country: "UK",
  },
};
