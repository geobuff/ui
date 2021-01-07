import React from "react";
import { Button } from "@chakra-ui/core";

export default {
  title: "UI/Button",
  component: Button,
  argTypes: {
    size: { control: { type: "select", options: ["sm", "md", "lg"] } },
    disabled: { control: { type: "boolean" } },
  },
};

const Template = (args) => <Button {...args} />;

const defaultProps = {
  size: "md",
  disabled: false,
  children: "Click me!",
  isFullWidth: false,
};

export const Default = Template.bind({});

Default.args = { ...defaultProps };

export const GreenColorScheme = Template.bind({});

GreenColorScheme.args = {
  ...defaultProps,
  colorScheme: "green",
  children: "START",
};

export const RedColorScheme = Template.bind({});

RedColorScheme.args = {
  ...defaultProps,
  colorScheme: "red",
  children: "GIVE UP",
};
