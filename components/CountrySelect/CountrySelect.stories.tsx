import React from "react";
import CountrySelect from "./CountrySelect";

export default {
  title: "UI/CountrySelect",
  component: CountrySelect,
};

const options = [
  {
    label: "New Zealand",
    value: "nz",
  },
  {
    label: "Australia",
    value: "au",
  },
  {
    label: "United States of America",
    value: "us",
  },
  {
    label: "United Kingdom",
    value: "uk",
  },
];

const Template = (args) => <CountrySelect {...args} />;

export const Default = Template.bind({});
Default.args = {
  options,
  fieldProps: { value: "" },
};
