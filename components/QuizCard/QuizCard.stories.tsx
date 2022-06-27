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
  imageUrl: `${process.env.NEXT_PUBLIC_CDN_URL}/headers/world-map-header.svg`,
  time: 300,
  maxScore: 197,
  plural: "countries",
};
