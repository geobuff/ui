import React from "react";
import PropTypes from "prop-types";

import { Text } from "@chakra-ui/react";

import { toMinTwoDigits } from "../../helpers/format-text";
import { secondsToMinutesString } from "../../helpers/time";

const Timer = ({ children }) => (
  <Text lineHeight={1.15} color="white" fontSize="32px" fontWeight={700}>
    {children}
  </Text>
);

const GameInputBannerTimer = ({
  expiryTimestamp,
  hasGameStarted,
  totalSeconds,
}) => {
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

GameInputBannerTimer.propTypes = {
  expiryTimestamp: PropTypes.number,
  hasGameStarted: PropTypes.bool,
  totalSeconds: PropTypes.number,
};
GameInputBannerTimer.defaultProps = {
  expiryTimestamp: null,
  hasGameStarted: false,
  totalSeconds: 900,
};

export default GameInputBannerTimer;
