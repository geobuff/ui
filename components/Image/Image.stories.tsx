import React from "react";
import Image from "./Image";

export default {
  title: "UI/Image",
  component: Image,
};

const Template = (args) => <Image {...args} />;

export const Default = Template.bind({});
Default.args = {
  src: "https://twemoji.maxcdn.com/v/13.0.1/svg/1f1fa-1f1f8.svg",
  height: "200px",
  width: "300px",
};
