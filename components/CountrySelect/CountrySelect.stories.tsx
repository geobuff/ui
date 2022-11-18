import React from "react";

import CountrySelect, { Props } from "./CountrySelect";

export default {
  title: "UI/CountrySelect",
  component: CountrySelect,
};

const Template = (args: Props): React.ReactNode => <CountrySelect {...args} />;

export const Default = Template.bind({});

Default.args = {
  fieldProps: { value: "" },
};
