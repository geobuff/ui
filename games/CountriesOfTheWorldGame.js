import React from "react";
import { Box, Heading } from "@chakra-ui/core";
import { SVGMap } from "react-svg-map";
import World from "@svg-maps/world";

const CountriesOfTheWorldGame = () => (
  <Box width="100%">
    <Heading m={10} textAlign="center">
      {"Countries of the World Quiz"}
    </Heading>

    <Box width="100%" textAlign="center">
      <SVGMap map={World} />
    </Box>
  </Box>
);

export default CountriesOfTheWorldGame;
