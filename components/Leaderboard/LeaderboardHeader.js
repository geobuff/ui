import React from "react";
import PropTypes from "prop-types";

import { Box, Heading, Fade, Flex, Spinner } from "@chakra-ui/react";

import Twemoji from "../Twemoji";

const LeaderboardHeader = ({ isLoading, ...props }) => {
  return (
    <Flex alignItems="center" paddingX={{ base: 3, sm: 0, md: 0 }} {...props}>
      <Box as="span" marginRight={1} paddingTop={1}>
        <Twemoji
          emoji="🏆"
          height={{ base: "26px", sm: "36px", md: "42px" }}
          width={{ base: "26px", sm: "36px", md: "42px" }}
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
      <Fade in={isLoading} unmountOnExit>
        <Spinner
          marginLeft={4}
          marginTop={3}
          size="md"
          color="blue.500"
          emptyColor="green.500"
        />
      </Fade>
    </Flex>
  );
};

LeaderboardHeader.propTypes = {
  isLoading: PropTypes.bool,
};

LeaderboardHeader.defaultProps = {
  isLoading: false,
};

export default LeaderboardHeader;
