import React from "react";
import { Result } from "../../types/result";
import ResultsList, { Props } from "./ResultsList";

export default {
  title: "UI/ResultsList",
  component: ResultsList,
};

const Template = (args: Props): React.ReactNode => <ResultsList {...args} />;

const results: Result[] = [
  {
    name: "american samoa",
    code: "AS",
    svgName: "American Samoa",
    isHidden: false,
    isMissedResult: false,
  },
  {
    name: "australia",
    code: "AU",
    svgName: "Australia",
    isHidden: false,
    isMissedResult: true,
  },
  {
    name: "christmas island",
    code: "CX",
    svgName: "Christmas Island",
    isHidden: true,
    isMissedResult: false,
  },
  {
    name: "cook islands",
    code: "CK",
    svgName: "Cook Islands",
    isHidden: false,
    isMissedResult: false,
  },
  {
    name: "fiji",
    code: "FJ",
    svgName: "Fiji",
    isHidden: false,
    isMissedResult: false,
  },
  {
    name: "french polynesia",
    code: "PR",
    svgName: "French Polynesia",
    isHidden: true,
    isMissedResult: false,
  },
  {
    name: "kiribati",
    code: "KI",
    svgName: "Kiribati",
    isHidden: false,
    isMissedResult: false,
  },
  {
    name: "micronesia",
    code: "FM",
    svgName: "Micronesia",
    isHidden: true,
    isMissedResult: false,
  },
  {
    name: "nauru",
    code: "NR",
    svgName: "Nauru",
    isHidden: true,
    isMissedResult: false,
  },
  {
    name: "new caledonia",
    code: "NC",
    svgName: "New Caledonia",
    isHidden: false,
    isMissedResult: false,
  },
  {
    name: "new zealand",
    code: "NZ",
    svgName: "New Zealand",
    isHidden: false,
    isMissedResult: true,
  },
];

export const HasFlags = Template.bind({});
export const NoFlags = Template.bind({});

HasFlags.args = {
  results,
  plural: "countries",
  hasFlags: true,
};

NoFlags.args = {
  results,
  plural: "countries",
  hasFlags: false,
};
