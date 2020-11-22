import React from "react";
import { Box, Heading } from "@chakra-ui/core";
import { SVGMap } from "react-svg-map";
import World from "@svg-maps/world";

const CountriesOfTheWorldGame = () => (
  <Box width="100%" height="100vh" backgroundColor="#F5F5F5">
    <Heading px={10} py={8} textAlign="center">
      {"Countries of the World Quiz"}
    </Heading>

    <Box width="100%" textAlign="center">
      <SVGMap
        map={World}
        className="countries-of-world"
        locationClassName="highlight-on-hover"
      />
    </Box>
  </Box>
);

export default CountriesOfTheWorldGame;
