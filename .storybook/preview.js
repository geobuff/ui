import React from "react";
import { ChakraProvider, CSSReset } from "@chakra-ui/core";

import theme from "../styles/theme";

const withThemeProvider = (Story, context) => {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Story {...context} />
    </ChakraProvider>
  );
};

export const decorators = [withThemeProvider];
