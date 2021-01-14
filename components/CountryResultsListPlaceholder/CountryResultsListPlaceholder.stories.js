import React from "react";
import CountryResultsListPlaceholder from "./CountryResultsListPlaceholder";

export default {
  title: "UI/CountryResultsListPlaceholder",
  component: CountryResultsListPlaceholder,
};

const Template = (args) => <CountryResultsListPlaceholder {...args} />;

export const Default = Template.bind({});
Default.args = {};
