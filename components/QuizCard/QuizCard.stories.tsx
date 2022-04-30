import React from "react";
import QuizCard, { Props } from "./QuizCard";

export default {
  title: "UI/QuizCard",
  component: QuizCard,
};

const Template = (args: Props): React.ReactNode => <QuizCard {...args} />;

export const Default = Template.bind({});

Default.args = {
  name: "Countries of the World",
  imageUrl: "https://dev.geobuff.com/headers/world-map-header.svg",
  time: 300,
  maxScore: 197,
  plural: "countries",
};
