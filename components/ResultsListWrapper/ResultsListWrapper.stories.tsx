import React from "react";
import ResultsListWrapper from "./ResultsListWrapper";

export default {
  title: "UI/ResultsListWrapper",
  component: ResultsListWrapper,
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

const Template = (args) => <ResultsListWrapper {...args} />;

export const Default = Template.bind({});
Default.args = {
  results: results,
};
