import React from "react";

import { Box, Heading, Flex } from "@chakra-ui/react";

import Twemoji from "../Twemoji";

const LeaderboardHeader = (props) => {
  return (
    <Flex alignItems="center" paddingX={{ base: 3, sm: 0, md: 0 }} {...props}>
      <Box as="span" marginRight={1} paddingTop={1}>
        <Twemoji
          emoji="🏆"
          height={{ base: "26px", sm: "36px", md: "46px" }}
          width={{ base: "26px", sm: "36px", md: "46px" }}
        />
      </Box>
      <Heading
        as="h1"
        ml={{ base: 2, md: 3 }}
        fontSize={{ base: "26px", sm: "36px", md: "42px" }}
        fontWeight="bold"
      >
        {"Leaderboard"}
      </Heading>
    </Flex>
  );
};

export default LeaderboardHeader;
