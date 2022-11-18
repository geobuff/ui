import React from "react";

import GameMapQuizBottomSheet from ".";
import { MappingEntry } from "../../../types/mapping-entry";
import { Result } from "../../../types/result";
import { Props } from "./GameMapQuizBottomSheet";

export default {
  title: "UI/GameMapQuizBottomSheet",
  component: GameMapQuizBottomSheet,
};

const Template = (args: Props): React.ReactNode => (
  <GameMapQuizBottomSheet {...args} />
);

const mapping: MappingEntry[] = [
  {
    id: 0,
    groupId: 0,
    name: "australia",
    code: "au",
    flagUrl: "https://twemoji.maxcdn.com/v/13.0.1/svg/1f1e6-1f1fa.svg",
    svgName: "Australia",
    alternativeNames: [],
    prefixes: [],
    grouping: "oceania",
    checked: false,
  },
  {
    id: 0,
    groupId: 0,
    name: "new zealand",
    code: "nz",
    flagUrl: "https://twemoji.maxcdn.com/v/13.0.1/svg/1f1f3-1f1ff.svg",
    svgName: "New Zealand",
    alternativeNames: [],
    prefixes: [],
    grouping: "oceania",
    checked: false,
  },
  {
    id: 0,
    groupId: 0,
    name: "afghanistan",
    code: "af",
    flagUrl: "https://twemoji.maxcdn.com/v/13.0.1/svg/1f1e6-1f1eb.svg",
    svgName: "Afghanistan",
    alternativeNames: [],
    prefixes: [],
    grouping: "asia",
    checked: false,
  },
];

const checked: MappingEntry[] = [
  {
    id: 0,
    groupId: 0,
    name: "australia",
    code: "au",
    flagUrl: "https://twemoji.maxcdn.com/v/13.0.1/svg/1f1e6-1f1fa.svg",
    svgName: "Australia",
    alternativeNames: [],
    prefixes: [],
    grouping: "oceania",
    checked: true,
  },
  {
    id: 0,
    groupId: 0,
    name: "new zealand",
    code: "nz",
    flagUrl: "https://twemoji.maxcdn.com/v/13.0.1/svg/1f1f3-1f1ff.svg",
    svgName: "New Zealand",
    alternativeNames: [],
    prefixes: [],
    grouping: "oceania",
    checked: true,
  },
  {
    id: 0,
    groupId: 0,
    name: "afghanistan",
    code: "af",
    flagUrl: "https://twemoji.maxcdn.com/v/13.0.1/svg/1f1e6-1f1eb.svg",
    svgName: "Afghanistan",
    alternativeNames: [],
    prefixes: [],
    grouping: "asia",
    checked: true,
  },
];

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
    code: "BR",
    flagUrl: "https://twemoji.maxcdn.com/v/13.0.1/svg/1f1e7-1f1f7.svg",
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
