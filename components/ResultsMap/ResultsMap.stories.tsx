import React from "react";
import { MappingEntry } from "../../types/mapping-entry";
import { ResultMap } from "../../types/result-map";
import ResultsMap, { Props } from "./ResultsMap";

export default {
  title: "UI/ResultsMap",
  component: ResultsMap,
};

const Template = (args: Props): React.ReactNode => <ResultsMap {...args} />;

const map: ResultMap = {
  asia: [
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
    },
    {
      id: 0,
      groupId: 0,
      name: "armenia",
      code: "am",
      flagUrl: "https://twemoji.maxcdn.com/v/13.0.1/svg/1f1f3-1f1ff.svg",
      svgName: "Armenia",
      alternativeNames: [],
      prefixes: [],
      grouping: "asia",
    },
  ],
  oceania: [
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
    },
    {
      id: 0,
      groupId: 0,
      name: "fiji",
      code: "fj",
      flagUrl: "https://twemoji.maxcdn.com/v/13.0.1/svg/1f1f3-1f1ff.svg",
      svgName: "Fiji",
      alternativeNames: [],
      prefixes: [],
      grouping: "oceania",
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
    },
  ],
};

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

export const InProgress = Template.bind({});
export const GameOver = Template.bind({});

InProgress.args = {
  map,
  checked,
  hasGameStopped: false,
  hasGroupings: true,
  hasFlags: true,
};

GameOver.args = {
  map,
  checked,
  hasGameStopped: true,
  hasGroupings: true,
  hasFlags: true,
};
