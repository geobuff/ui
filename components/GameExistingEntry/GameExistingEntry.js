import React from "react";
// import PropTypes from "prop-types";
import { Box, Flex, Text } from "@chakra-ui/core";

import Twemoji from "../Twemoji/Twemoji";

const GameExistingEntry = () => {
  return (
    <Flex
      borderRadius={12}
      backgroundColor="#F0F0F0"
      justifyContent="space-between"
      paddingY={3}
      paddingX={4}
    >
      <Box>
        <Text color="#768389" fontSize="10px" fontWeight="bold">
          {"RANK"}
        </Text>
        <Text fontSize="14px" fontWeight="bold">
          {"22,204"}
        </Text>
      </Box>
      <Box>
        <Text color="#768389" fontSize="10px" fontWeight="bold">
          {"USERNAME"}
        </Text>
        <Flex alignItems="center">
          <Text
            fontSize="14px"
            fontWeight="bold"
            maxWidth="150px"
            marginRight={1}
            isTruncated
          >
            {"KirbyScrub"}
          </Text>
          <Twemoji emoji="🇳🇿" height="18px" width="18px" />
        </Flex>
      </Box>
      <Box>
        <Text color="#768389" fontSize="10px" fontWeight="bold">
          {"TIME"}
        </Text>
        <Text fontSize="14px" fontWeight="bold">
          {"15:00"}
        </Text>
      </Box>
      <Box>
        <Text color="#768389" fontSize="10px" fontWeight="bold">
          {"SCORE"}
        </Text>
        <Text fontSize="14px" fontWeight="bold">
          {"103"}
        </Text>
      </Box>
    </Flex>
  );
};

GameExistingEntry.propTypes = {};
GameExistingEntry.defaultProps = {};

export default GameExistingEntry;
