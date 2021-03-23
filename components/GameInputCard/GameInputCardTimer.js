import React from "react";
import PropTypes from "prop-types";

import { Box, Text } from "@chakra-ui/react";

import { toMinTwoDigits } from "../../helpers/format-text";
import { secondsToMinutesString } from "../../helpers/time";

const Timer = ({ children }) => (
  <Box>
    <Text fontWeight="bold">{"TIME REMAINING"}</Text>
    <Text fontWeight={800} fontSize="36px">
      {children}
    </Text>
  </Box>
);

const GameInputCardTimer = ({
  totalSeconds,
  expiryTimestamp,
  hasGameStarted,
  hasGameStopped,
}) => {
  if (hasGameStopped) {
    return (
      <Timer>
        {`${toMinTwoDigits(expiryTimestamp.minutes)}:${toMinTwoDigits(
          expiryTimestamp.seconds
        )}`}
      </Timer>
    );
  }

  if (!hasGameStarted) {
    return <Timer>{secondsToMinutesString(totalSeconds)}</Timer>;
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
  totalSeconds: PropTypes.number,
  expiryTimestamp: PropTypes.number,
  hasGameStarted: PropTypes.bool,
  hasGameStopped: PropTypes.bool,
};
GameInputCardTimer.defaultProps = {
  totalSeconds: 900,
  expiryTimestamp: null,
  hasGameStarted: false,
  hasGameStopped: false,
};

export default GameInputCardTimer;
