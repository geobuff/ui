import React from "react";
import { Box, Heading, Text } from "@chakra-ui/core";
import { SVGMap } from "react-svg-map";
import World from "@svg-maps/world";
import Sheet from "react-modal-sheet";

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

    <Sheet
      isOpen
      onClose={null}
      snapPoints={[600, 400, 100, 0]}
      initialSnap={1}
    >
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          {
            <Text>{"Hey haha"}</Text>
            /* Your sheet content goes here */
          }
        </Sheet.Content>
      </Sheet.Container>

      {/* <Sheet.Backdrop /> */}
    </Sheet>
  </Box>
);

export default CountriesOfTheWorldGame;
