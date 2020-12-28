import React, { useState } from "react";

import { Button, Box, Heading } from "@chakra-ui/core";

import World from "@svg-maps/world";
import { SVGMap } from "react-svg-map";

export default function Home() {
  const [answeredCountriesList, setAnsweredCountriesList] = useState([]);

  const getLocationClassName = (location) => {
    if (answeredCountriesList?.find((country) => country === location.name)) {
      return `selected`;
    }
  };

  return (
    <Box width="100%" textAlign="center">
      <Heading mt={4}>{"Welcome to Scrub.NET"}</Heading>
      <Button
        my={5}
        onClick={() =>
          setAnsweredCountriesList([...answeredCountriesList, "Russia"])
        }
      >
        {"Click me pls"}
      </Button>
      <SVGMap map={World} locationClassName={getLocationClassName} />;
    </Box>
  );
}
