import React from "react";
import ResultsMap from "./ResultsMap";

export default {
  title: "UI/ResultsMap",
  component: ResultsMap,
};

const Template = (args) => <ResultsMap {...args} />;

export const Default = Template.bind({});
Default.args = {};
