import React from "react";

import { ChakraProvider } from "@chakra-ui/react";

import theme from "../styles/theme";

const withChakraProvider = (Story, context) => {
  return (
    <ChakraProvider theme={theme}>
      <Story {...context} />
    </ChakraProvider>
  );
};

export const decorators = [withChakraProvider];
