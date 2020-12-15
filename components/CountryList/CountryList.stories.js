import React from "react";
import CountryList from "./CountryList";

export default {
  title: "UI/CountryList",
  component: CountryList,
};

const countries = [
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

const Template = (args) => <CountryList {...args} />;

export const Default = Template.bind({});
Default.args = {
  countries,
};
