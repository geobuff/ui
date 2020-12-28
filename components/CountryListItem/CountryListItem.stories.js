import React from "react";
import CountryListItem from "./CountryListItem";

export default {
  title: "UI/CountryListItem",
  component: CountryListItem,
};

const Template = (args) => <CountryListItem {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const IsHidden = Template.bind({});
IsHidden.args = {
  isHidden: true,
};
