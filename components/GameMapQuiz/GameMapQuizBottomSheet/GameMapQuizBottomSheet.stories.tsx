import React from "react";
import GameMapQuizBottomSheet from ".";
import { Mapping } from "../../../types/mapping";
import { Result } from "../../../types/result";
import { Props } from "./GameMapQuizBottomSheet";

export default {
  title: "UI/GameMapQuizBottomSheet",
  component: GameMapQuizBottomSheet,
};

const Template = (args: Props): React.ReactNode => (
  <GameMapQuizBottomSheet {...args} />
);

const mapping: Mapping[] = [
  {
    name: "australia",
    code: "au",
    svgName: "Australia",
    alternativeNames: [],
    prefixes: [],
    group: "oceania",
    checked: false,
  },
  {
    name: "new zealand",
    code: "nz",
    svgName: "New Zealand",
    alternativeNames: [],
    prefixes: [],
    group: "oceania",
    checked: false,
  },
  {
    name: "afghanistan",
    code: "af",
    svgName: "Afghanistan",
    alternativeNames: [],
    prefixes: [],
    group: "asia",
    checked: false,
  },
];

const checked: Mapping[] = [
  {
    name: "australia",
    code: "au",
    svgName: "Australia",
    alternativeNames: [],
    prefixes: [],
    group: "oceania",
    checked: true,
  },
  {
    name: "new zealand",
    code: "nz",
    svgName: "New Zealand",
    alternativeNames: [],
    prefixes: [],
    group: "oceania",
    checked: true,
  },
  {
    name: "afghanistan",
    code: "af",
    svgName: "Afghanistan",
    alternativeNames: [],
    prefixes: [],
    group: "asia",
    checked: true,
  },
];

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

export const Default = Template.bind({});

Default.args = {
  hasLeaderboard: false,
  id: 1,
  name: "Countries of the World",
  plural: "countries",
  hasFlags: false,
  hasGrouping: false,
  mapping: mapping,
  checked: checked,
  recents: recents,
  hasGameRunOnce: false,
  hasGameStarted: false,
  hasGameStopped: false,
  isOpen: false,
};
