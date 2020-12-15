import React from "react";
import RecentCountryList from "./RecentCountryList";

export default {
  title: "UI/RecentCountryList",
  component: RecentCountryList,
};

// TODO: km - move to sample data folder
const countries = [
  {
    code: "NZ",
    name: "New Zealand",
  },
  {
    code: "FR",
    name: "France",
  },
  {
    code: "DE",
    name: "Germany",
  },
  {
    code: "AU",
    name: "Australia",
  },
  {
    code: "FJ",
    name: "Fiji",
  },
  {
    code: "JP",
    name: "Japan",
  },
  {
    code: "CH",
    name: "Switzerland",
  },
  {
    code: "MX",
    name: "Mexico",
  },
];

const Template = (args) => <RecentCountryList {...args} />;

export const Default = Template.bind({});
Default.args = {
  countries,
};
