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
      svgName: "Afghanistan",
      alternativeNames: [],
      prefixes: [],
      group: "asia",
    },
    {
      id: 0,
      groupId: 0,
      name: "armenia",
      code: "am",
      svgName: "Armenia",
      alternativeNames: [],
      prefixes: [],
      group: "asia",
    },
  ],
  oceania: [
    {
      id: 0,
      groupId: 0,
      name: "australia",
      code: "au",
      svgName: "Australia",
      alternativeNames: [],
      prefixes: [],
      group: "oceania",
    },
    {
      id: 0,
      groupId: 0,
      name: "fiji",
      code: "fj",
      svgName: "Fiji",
      alternativeNames: [],
      prefixes: [],
      group: "oceania",
    },
    {
      id: 0,
      groupId: 0,
      name: "new zealand",
      code: "nz",
      svgName: "New Zealand",
      alternativeNames: [],
      prefixes: [],
      group: "oceania",
    },
  ],
};

const checked: MappingEntry[] = [
  {
    id: 0,
    groupId: 0,
    name: "australia",
    code: "au",
    svgName: "Australia",
    alternativeNames: [],
    prefixes: [],
    group: "oceania",
    checked: true,
  },
  {
    id: 0,
    groupId: 0,
    name: "new zealand",
    code: "nz",
    svgName: "New Zealand",
    alternativeNames: [],
    prefixes: [],
    group: "oceania",
    checked: true,
  },
  {
    id: 0,
    groupId: 0,
    name: "afghanistan",
    code: "af",
    svgName: "Afghanistan",
    alternativeNames: [],
    prefixes: [],
    group: "asia",
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
