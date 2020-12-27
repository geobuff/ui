import React from "react";
import PropTypes from "prop-types";
import { Box, Text } from "@chakra-ui/core";

import { useTimer } from "react-timer-hook";

const formatTimeLabel = (time) =>
  time.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

const GameInputCardTimer = ({ expiryTimestamp, onExpire }) => {
  const { seconds, minutes } = useTimer({
    expiryTimestamp,
    onExpire: onExpire,
  });

  return (
    <Box>
      <Text fontWeight="bold">{"TIME REMAINING"}</Text>
      <Text fontWeight={800} fontSize="36px">
        {`${formatTimeLabel(minutes)}:${formatTimeLabel(seconds)}`}
      </Text>
    </Box>
  );
};

GameInputCardTimer.propTypes = {
  expiryTimestamp: PropTypes.number,
  onExpire: PropTypes.func,
};
GameInputCardTimer.defaultProps = {
  expiryTimestamp: null,
  onExpire: null,
};

export default GameInputCardTimer;
