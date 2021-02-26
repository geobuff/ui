import React from "react";
import PropTypes from "prop-types";
import { Box, Flex, Text } from "@chakra-ui/react";

import { formatNumber } from "../../helpers/number";
import { secondsToMinutesString } from "../../helpers/time";

const GameExistingEntry = ({ ranking, score, time, username }) => {
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
          {formatNumber(ranking)}
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
            {username}
          </Text>
        </Flex>
      </Box>
      <Box>
        <Text color="#768389" fontSize="10px" fontWeight="bold">
          {"TIME"}
        </Text>
        <Text fontSize="14px" fontWeight="bold">
          {secondsToMinutesString(time)}
        </Text>
      </Box>
      <Box>
        <Text color="#768389" fontSize="10px" fontWeight="bold">
          {"SCORE"}
        </Text>
        <Text fontSize="14px" fontWeight="bold">
          {score}
        </Text>
      </Box>
    </Flex>
  );
};

GameExistingEntry.propTypes = {
  ranking: PropTypes.number,
  score: PropTypes.number,
  time: PropTypes.number,
  username: PropTypes.string,
  countryCode: PropTypes.string,
};
GameExistingEntry.defaultProps = {
  rank: 0,
  score: 0,
  time: "15:00",
  username: "PhileasFogg",
  country: "UK",
};

export default GameExistingEntry;
