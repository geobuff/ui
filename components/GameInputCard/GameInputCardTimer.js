import React from "react";
import PropTypes from "prop-types";
import { useTimer } from "react-timer-hook";

import { Box, Text } from "@chakra-ui/core";

import { toMinTwoDigits } from "../../helpers/format-text";

const Timer = ({ children }) => (
  <Box>
    <Text fontWeight="bold">{"TIME REMAINING"}</Text>
    <Text fontWeight={800} fontSize="36px">
      {children}
    </Text>
  </Box>
);

const GameInputCardTimer = ({ expiryTimestamp, hasGameStarted, onExpire }) => {
  if (!hasGameStarted) {
    return <Timer>{"15:00"}</Timer>;
  }

  const { seconds, minutes } = useTimer({
    expiryTimestamp,
    onExpire: onExpire,
  });

  return (
    <Timer>{`${toMinTwoDigits(minutes)}:${toMinTwoDigits(seconds)}`}</Timer>
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
  onExpire: PropTypes.func,
};
GameInputCardTimer.defaultProps = {
  expiryTimestamp: null,
  hasGameStarted: false,
  onExpire: () => {},
};

export default GameInputCardTimer;
