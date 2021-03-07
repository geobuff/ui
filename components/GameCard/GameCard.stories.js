import React from "react";
import GameCard from "./GameCard";

import { Box } from "@chakra-ui/react";

import { Quizzes } from "../../helpers/quizzes";

export default {
  title: "UI/GameCard",
  component: GameCard,
};

const Template = (args) => (
  <Box maxWidth="210px">
    <GameCard {...args} />
  </Box>
);

export const Default = Template.bind({});
Default.args = {
  quiz: Quizzes.CountriesOfTheWorld,
};
