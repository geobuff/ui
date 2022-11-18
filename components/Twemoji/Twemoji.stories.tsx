import React from "react";

import { Box } from "@chakra-ui/react";

import Twemoji, { Props } from "./Twemoji";

export default {
  title: "UI/Twemoji",
  component: Twemoji,
};

const Template = (args: Props): React.ReactNode => <Twemoji {...args} />;

const GalleryTemplate = (args: Props): React.ReactNode => (
  <>
    {/* @ts-ignore */}
    {args.emojis.map((emoji: string, index: number) => (
      <Box m={10} key={index}>
        <Twemoji emoji={emoji} height="56px" width="56px" />
      </Box>
    ))}
  </>
);

export const Default = Template.bind({});
export const Gallery = GalleryTemplate.bind({});

Default.args = {
  emoji: "👋",
  height: "56px",
  width: "56px",
};

Gallery.args = {
  emojis: ["🌏", "🏆", "🇳🇿", "😎", "🔥", "🎉", "🥳", "💩", "🥴"],
  height: "56px",
  width: "56px",
};
