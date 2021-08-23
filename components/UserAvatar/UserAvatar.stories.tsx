import React from "react";

import UserAvatar from "./UserAvatar";

export default {
  title: "UI/UserAvatar",
  component: UserAvatar,
};

const Template = (args) => <UserAvatar {...args} />;

export const Default = Template.bind({});

Default.args = {
  height: "56px",
  width: "56px",
  alt: "An image of grandmasterkirb",
  imageUrl: "https://i.pravatar.cc/1000",
};
