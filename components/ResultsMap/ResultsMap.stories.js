import React from "react";
import { Quizzes } from "../../helpers/quizzes";
import ResultsMap from "./ResultsMap";

export default {
  title: "UI/ResultsMap",
  component: ResultsMap,
};

const results = [
  {
    code: "AU",
    svgName: "Australia",
    isHidden: false,
  },
  {
    code: "NZ",
    svgName: "New Zealand",
    isHidden: false,
  },
  {
    code: "AF",
    svgName: "Afghanistan",
    isHidden: false,
  },
];

const map = {
  asia: [
    {
      name: "afghanistan",
      code: "af",
      svgName: "Afghanistan",
      alternativeNames: [],
      prefixes: [],
    },
    {
      name: "armenia",
      code: "am",
      svgName: "Armenia",
      alternativeNames: [],
      prefixes: [],
    },
  ],
  oceania: [
    {
      name: "australia",
      code: "au",
      svgName: "Australia",
      alternativeNames: [],
      prefixes: [],
    },
    {
      name: "fiji",
      code: "fj",
      svgName: "Fiji",
      alternativeNames: [],
      prefixes: [],
    },
    {
      name: "new zealand",
      code: "nz",
      svgName: "New Zealand",
      alternativeNames: [],
      prefixes: [],
    },
  ],
};

const Template = (args) => <ResultsMap {...args} />;

export const Default = Template.bind({});
Default.args = {
  quizId: Quizzes.CountriesOfTheWorld,
  results,
  map,
};
