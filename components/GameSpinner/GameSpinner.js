import React from "react";
import { Fade, Flex, Spinner } from "@chakra-ui/react";

const GameSpinner = () => (
  <Flex
    height={{ base: "30vh", md: "90vh" }}
    alignItems="center"
    justifyContent="center"
    color="white"
  >
    <Fade in unmountOnExit>
      <Spinner size="xl" color="#1d8db3" />
    </Fade>
  </Flex>
);

export default GameSpinner;
