import React, { useState } from "react";
import Head from "next/head";

import { Button, Box, Heading, Text } from "@chakra-ui/core";

import World from "@svg-maps/world";
import { SVGMap } from "react-svg-map";

export default function Home() {
  const [showText, setShowText] = useState(false);

  const handleClick = () => setShowText(!showText);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box width="100%" textAlign="center">
        <Heading mt={4}>{"Welcome to Scrub.NET"}</Heading>
        <Button my={5} onClick={handleClick}>
          {"Click me pls"}
        </Button>
        <Text
          fontWeight="bold"
          color="green.400"
          opacity={showText ? 1 : 0}
          transition="opacity 250ms ease-in-out"
        >
          {"Very tasty, thank you"}
        </Text>
        <SVGMap map={World} />;
      </Box>
    </>
  );
}
