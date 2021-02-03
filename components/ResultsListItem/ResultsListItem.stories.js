import React from "react";
import { Quizzes } from "../../helpers/quizzes";
import ResultsListItem from "./ResultsListItem";

export default {
  title: "UI/ResultsListItem",
  component: ResultsListItem,
};

const Template = (args) => <ResultsListItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  quiz: Quizzes.CountriesOfTheWorld,
  code: "nz",
  svgName: "New Zealand",
};

export const IsHidden = Template.bind({});
IsHidden.args = {
  quiz: Quizzes.CountriesOfTheWorld,
  isHidden: true,
};
