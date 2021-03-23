import React from "react";
import QuizCard from "./QuizCard";

import { Box } from "@chakra-ui/react";

export default {
  title: "UI/QuizCard",
  component: QuizCard,
};

const Template = (args) => (
  <Box maxWidth="210px">
    <QuizCard {...args} />
  </Box>
);

export const Default = Template.bind({});
Default.args = {
  quiz: {},
};
