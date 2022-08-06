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
    flagUrl: "https://twemoji.maxcdn.com/v/13.0.1/svg/1f1f3-1f1ff.svg",
    svgName: "New Zealand",
    isHidden: false,
    isMissedResult: false,
  },
  {
    name: "brazil",
    flagUrl: "https://twemoji.maxcdn.com/v/13.0.1/svg/1f1e7-1f1f7.svg",
    code: "BR",
    svgName: "Brasil",
    isHidden: false,
    isMissedResult: false,
  },
  {
    name: "france",
    code: "FR",
    flagUrl: "https://twemoji.maxcdn.com/v/13.0.1/svg/1f1eb-1f1f7.svg",
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
