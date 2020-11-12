import React from "react";
import { ChakraProvider, CSSReset } from "@chakra-ui/core";

const withThemeProvider = (Story, context) => {
  return (
    <ChakraProvider>
      <CSSReset />
      <Story {...context} />
    </ChakraProvider>
  );
};

export const decorators = [withThemeProvider];
