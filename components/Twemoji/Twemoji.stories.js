import { Box } from "@chakra-ui/react";
import React from "react";
import Twemoji from "./Twemoji";

export default {
  title: "UI/Twemoji",
  component: Twemoji,
};

const Template = (args) => <Twemoji {...args} />;

const GalleryTemplate = (args) => (
  <>
    {args.emojis.map((emoji, index) => (
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
