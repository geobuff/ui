import React from "react";
import { Result } from "../../types/result";
import GameInputCard, { Props } from "./GameInputCard";

export default {
  title: "UI/GameInputCard",
  component: GameInputCard,
};

const Template = (args: Props): React.ReactNode => <GameInputCard {...args} />;

export const Default = Template.bind({});

const recents: Result[] = [
  {
    name: "new zealand",
    code: "NZ",
    svgName: "New Zealand",
    isHidden: false,
    isMissedResult: false,
  },
  {
    name: "brazil",
    code: "BR",
    svgName: "Brasil",
    isHidden: false,
    isMissedResult: false,
  },
  {
    name: "france",
    code: "FR",
    svgName: "France",
    isHidden: false,
    isMissedResult: false,
  },
];

Default.args = {
  type: 1,
  maxScore: 197,
  plural: "countries",
  time: 900,
  hasFlags: true,
  recents: recents,
  score: 69,
  expiryTimestamp: { minutes: 0, seconds: 0 },
  errorMessage: "",
  hasGameRunOnce: false,
  hasGameStarted: false,
  hasGameStopped: false,
  hasError: false,
  inputValue: "",
};
