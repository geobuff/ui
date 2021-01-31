import React from "react";
import { Box, Input } from "@chakra-ui/core";

export default {
  title: "UI/Input",
  component: Input,
  argTypes: {
    size: { control: { type: "select", options: ["sm", "md", "lg"] } },
    disabled: { control: { type: "boolean" } },
    isInvalid: { control: { type: "boolean" } },
  },
};

const Template = (args) => (
  <Box backgroundColor="gray.100" p={5}>
    <Input {...args} />
  </Box>
);

export const Default = Template.bind({});
Default.args = {
  placeholder: "Enter countries...",
  size: "md",
  disabled: false,
  isInvalid: false,
};
