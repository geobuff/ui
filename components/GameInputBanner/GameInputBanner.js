import React from "react";
import PropTypes from "prop-types";
import { useTimer } from "react-timer-hook";

import { Box, Flex, Input, Text } from "@chakra-ui/core";

import { toMinTwoDigits } from "../../helpers/format-text";

const GameInputBanner = ({ expiryTimestamp, onExpire, score, total, verb }) => {
  const { seconds, minutes } = useTimer({
    expiryTimestamp,
    onExpire: onExpire,
  });

  return (
    <Flex
      alignItems="center"
      backgroundColor="#27AE60"
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.08)"
      px={3}
      py={2}
    >
      <Box textAlign="center" mr={3}>
        <Text lineHeight={1.15} color="white" fontSize="32px" fontWeight={700}>
          {`${toMinTwoDigits(minutes)}:${toMinTwoDigits(seconds)}`}
        </Text>
        <Text
          color="white"
          fontSize="12px"
          fontWeight={700}
          minWidth="125px"
          width="100%"
        >
          {`${score} of ${total} ${verb}`}
        </Text>
      </Box>
      <Input placeholder="Enter country" />
    </Flex>
  );
};

GameInputBanner.propTypes = {
  expiryTimestamp: PropTypes.number,
  onExpire: PropTypes.func,
  score: PropTypes.number,
  total: PropTypes.number,
  verb: PropTypes.string,
};
GameInputBanner.defaultProps = {
  expiryTimestamp: null,
  onExpire: null,
  score: 0,
  total: 0,
  verb: "countries",
};

export default GameInputBanner;
