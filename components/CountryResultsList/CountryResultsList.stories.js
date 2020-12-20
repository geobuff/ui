import React from "react";
import CountryResultsList from "./CountryResultsList";

export default {
  title: "UI/CountryResultsList",
  component: CountryResultsList,
};

const Template = (args) => <CountryResultsList {...args} />;

export const Default = Template.bind({});
Default.args = {};
