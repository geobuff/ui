import React from "react";
import ResultsList from "./ResultsList";

export default {
  title: "UI/ResultsList",
  component: ResultsList,
};

const results = [
  {
    code: "AS",
    svgName: "American Samoa",
    isHidden: false,
  },
  {
    code: "AU",
    svgName: "Australia",
    isHidden: false,
  },
  {
    code: "CX",
    svgName: "Christmas Island",
    isHidden: true,
  },
  {
    code: "CK",
    svgName: "Cook Islands",
    isHidden: false,
  },
  {
    code: "FJ",
    svgName: "Fiji",
    isHidden: false,
  },
  {
    code: "PR",
    svgName: "French Polynesia",
    isHidden: true,
  },
  {
    code: "KI",
    svgName: "Kiribati",
    isHidden: false,
  },
  {
    code: "FM",
    svgName: "Micronesia",
    isHidden: true,
  },
  {
    code: "NR",
    svgName: "Nauru",
    isHidden: true,
  },
  {
    code: "NC",
    svgName: "New Caledonia",
    isHidden: false,
  },
  {
    code: "NZ",
    svgName: "New Zealand",
    isHidden: false,
  },
];

const Template = (args) => <ResultsList {...args} />;

export const Default = Template.bind({});
Default.args = {
  quiz: {},
  results,
};
