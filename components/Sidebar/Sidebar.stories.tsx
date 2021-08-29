import React from "react";
import Sidebar, { Props } from "./Sidebar";

export default {
  title: "UI/Sidebar",
  component: Sidebar,
};

const Template = (args: Props): React.ReactNode => <Sidebar {...args} />;

export const Default = Template.bind({});

Default.args = {
  heading: "Countries of the World",
  quizId: 1,
  hasLeaderboard: true,
};
