import React from "react";
import ResultsList from "./ResultsList";

export default {
  title: "UI/ResultsList",
  component: ResultsList,
};

const results = [
  {
    code: "AS",
    name: "American Samoa",
  },
  {
    code: "AU",
    name: "Australia",
  },
  {
    code: "CX",
    name: "Christmas Island",
    isHidden: true,
  },
  {
    code: "CK",
    name: "Cook Islands",
  },
  {
    code: "FJ",
    name: "Fiji",
  },
  {
    code: "PR",
    name: "French Polynesia",
    isHidden: true,
  },
  {
    code: "GU",
    name: "Guam",
  },
  {
    code: "KI",
    name: "Kiribati",
  },
  {
    code: "MH",
    name: "Marshall Islands",
  },
  {
    code: "FM",
    name: "Micronesia",
  },
  {
    code: "NR",
    name: "Nauru",
  },
  {
    code: "NC",
    name: "New Caledonia",
  },
  {
    code: "NZ",
    name: "New Zealand",
  },
];

const Template = (args) => <ResultsList {...args} />;

export const Default = Template.bind({});
Default.args = {
  results,
};
