import React from "react";
import { Mapping } from "../../types/mapping";
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
      name: "afghanistan",
      code: "af",
      svgName: "Afghanistan",
      alternativeNames: [],
      prefixes: [],
      group: "asia",
    },
    {
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
      name: "australia",
      code: "au",
      svgName: "Australia",
      alternativeNames: [],
      prefixes: [],
      group: "oceania",
    },
    {
      name: "fiji",
      code: "fj",
      svgName: "Fiji",
      alternativeNames: [],
      prefixes: [],
      group: "oceania",
    },
    {
      name: "new zealand",
      code: "nz",
      svgName: "New Zealand",
      alternativeNames: [],
      prefixes: [],
      group: "oceania",
    },
  ],
};

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
