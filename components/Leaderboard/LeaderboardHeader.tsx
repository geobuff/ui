import React, { FC } from "react";
import { Box, Heading, Fade, Flex, Spinner } from "@chakra-ui/react";

import Twemoji from "../Twemoji";

interface Props {
  isLoading?: boolean;
  [x: string]: any;
}

const LeaderboardHeader: FC<Props> = ({ isLoading = false, ...props }) => (
  <Flex
    alignItems="center"
    minHeight="48px"
    paddingX={{ base: 3, sm: 0, md: 0 }}
    {...props}
  >
    <Box as="span" marginRight={1} paddingTop={1}>
      <Twemoji
        emoji="🏆"
        height={{ base: "26px", sm: "36px", md: "46px" }}
        width={{ base: "26px", sm: "36px", md: "46px" }}
      />
    </Box>
    <Box>
      <Heading
        as="h1"
        ml={{ base: 2, md: 3 }}
        fontSize={{ base: "28px", sm: "36px", md: "48px" }}
        fontWeight="bold"
      >
        {"Leaderboard"}
      </Heading>
    </Box>
    <Fade in={isLoading} unmountOnExit>
      <Spinner
        marginLeft={{ base: 3, md: 4 }}
        marginTop={3}
        size="md"
        color="blue.500"
        emptyColor="green.500"
      />
    </Fade>
  </Flex>
);

export default LeaderboardHeader;
