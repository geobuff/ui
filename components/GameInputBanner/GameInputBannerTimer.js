import React from "react";
import PropTypes from "prop-types";

import { Text } from "@chakra-ui/react";

import { toMinTwoDigits } from "../../helpers/format-text";

const Timer = ({ children }) => (
  <Text lineHeight={1.15} color="white" fontSize="32px" fontWeight={700}>
    {children}
  </Text>
);

// TODO: merge this component with GameInputCardTimer
const GameInputBannerTimer = ({ expiryTimestamp, hasGameStarted }) => {
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

GameInputBannerTimer.propTypes = {
  expiryTimestamp: PropTypes.number,
  hasGameStarted: PropTypes.bool,
};
GameInputBannerTimer.defaultProps = {
  expiryTimestamp: null,
  hasGameStarted: false,
};

export default GameInputBannerTimer;
