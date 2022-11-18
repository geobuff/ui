import React from "react";

import ResultsListItem, { Props } from "./ResultsListItem";

export default {
  title: "UI/ResultsListItem",
  component: ResultsListItem,
};

const Template = (args: Props): React.ReactNode => (
  <ResultsListItem {...args} />
);

export const Default = Template.bind({});
export const FadeIn = Template.bind({});
export const NoFlag = Template.bind({});
export const IsHidden = Template.bind({});
export const IsMissedResult = Template.bind({});

Default.args = {
  code: "nz",
  svgName: "New Zealand",
  isHidden: false,
  isMissedResult: false,
  hasFlag: true,
  shouldFadeIn: false,
};

FadeIn.args = {
  code: "nz",
  svgName: "New Zealand",
  isHidden: false,
  isMissedResult: false,
  hasFlag: true,
  shouldFadeIn: true,
};

NoFlag.args = {
  code: "nz",
  svgName: "New Zealand",
  isHidden: false,
  isMissedResult: false,
  hasFlag: false,
  shouldFadeIn: false,
};

IsHidden.args = {
  code: "nz",
  svgName: "New Zealand",
  isHidden: true,
  isMissedResult: false,
  hasFlag: true,
  shouldFadeIn: false,
};

IsMissedResult.args = {
  code: "nz",
  svgName: "New Zealand",
  isHidden: false,
  isMissedResult: true,
  hasFlag: true,
  shouldFadeIn: false,
};
