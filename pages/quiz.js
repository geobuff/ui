import React from "react";
import { Box } from "@chakra-ui/core";
import { SVGMap } from "react-svg-map";
import World from "@svg-maps/world";

export default function Home() {
  return (
    // <Box width="100%" textAlign="center">
    // <Center zIndex={10} backgroundColor="red">
    <Box>
      <SVGMap map={World} />
    </Box>
    // </Center>
    // </Box>
  );
}
