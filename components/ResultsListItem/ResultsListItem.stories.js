import React from "react";
import ResultsListItem from "./ResultsListItem";

export default {
  title: "UI/ResultsListItem",
  component: ResultsListItem,
};

const Template = (args) => <ResultsListItem {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const IsHidden = Template.bind({});
IsHidden.args = {
  isHidden: true,
};
