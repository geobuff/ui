import React from "react";
import PropTypes from "prop-types";

import { Box, Text } from "@chakra-ui/react";

import { toMinTwoDigits } from "../../helpers/format-text";

const Timer = ({ children }) => (
  <Box>
    <Text fontWeight="bold">{"TIME REMAINING"}</Text>
    <Text fontWeight={800} fontSize="36px">
      {children}
    </Text>
  </Box>
);

const GameInputCardTimer = ({ expiryTimestamp, hasGameStarted }) => {
  // TODO: update this to not reset on game over
  if (!hasGameStarted) {
    return <Timer>{"15:00"}</Timer>;
  }

  return (
    <Timer>{`${toMinTwoDigits(expiryTimestamp.minutes)}:${toMinTwoDigits(
      expiryTimestamp.seconds
    )}`}</Timer>
  );
};

Timer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

Timer.defaultProps = {
  children: "",
};

GameInputCardTimer.propTypes = {
  expiryTimestamp: PropTypes.number,
  hasGameStarted: PropTypes.bool,
};
GameInputCardTimer.defaultProps = {
  expiryTimestamp: null,
  hasGameStarted: false,
};

export default GameInputCardTimer;
