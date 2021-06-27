import React from "react";
import PropTypes from "prop-types";

import { Box, Heading, Fade, Flex, Spinner } from "@chakra-ui/react";

import Twemoji from "../Twemoji";

const LeaderboardHeader = ({ isLoading, ...props }) => {
  return (
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
};

LeaderboardHeader.propTypes = {
  isLoading: PropTypes.bool,
};

LeaderboardHeader.defaultProps = {
  isLoading: false,
};

export default LeaderboardHeader;
