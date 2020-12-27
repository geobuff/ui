import React from "react";
import PropTypes from "prop-types";
import { useTimer } from "react-timer-hook";

import { Box, Text } from "@chakra-ui/core";

import { toMinTwoDigits } from "../../helpers/format-text";

const GameInputCardTimer = ({ expiryTimestamp, onExpire }) => {
  const { seconds, minutes } = useTimer({
    expiryTimestamp,
    onExpire: onExpire,
  });

  return (
    <Box>
      <Text fontWeight="bold">{"TIME REMAINING"}</Text>
      <Text fontWeight={800} fontSize="36px">
        {`${toMinTwoDigits(minutes)}:${toMinTwoDigits(seconds)}`}
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
