import React from "react";
import { LeaderboardEntry } from "../../types/leaderboard-entry";
import GameOverModal, { Props } from "./GameOverModal";

export default {
  title: "UI/GameOverModal",
  component: GameOverModal,
};

const Template = (args: Props): React.ReactNode => <GameOverModal {...args} />;

export const Default = Template.bind({});
export const LoggedIn = Template.bind({});
export const ExistingEntry = Template.bind({});

Default.args = {
  quizName: "Countries of the World",
  maxScore: 197,
  score: 69,
  time: 900,
  existingEntry: null,
  isLoggedIn: false,
  isLoading: false,
  isOpen: true,
  isSubmitting: false,
};

LoggedIn.args = {
  quizName: "Countries of the World",
  maxScore: 197,
  score: 69,
  time: 900,
  existingEntry: null,
  isLoggedIn: true,
  isLoading: false,
  isOpen: true,
  isSubmitting: false,
};

const existingEntry: LeaderboardEntry = {
  id: 1,
  quizId: 1,
  userId: 1,
  username: "mrscrub",
  countryCode: "nz",
  score: 7,
  time: 300,
  added: new Date(),
  rank: 1,
};

ExistingEntry.args = {
  quizName: "Countries of the World",
  maxScore: 197,
  score: 69,
  time: 900,
  existingEntry: existingEntry,
  isLoggedIn: true,
  isLoading: false,
  isOpen: true,
  isSubmitting: false,
};
