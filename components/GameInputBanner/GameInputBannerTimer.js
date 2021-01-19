import React from "react";
import PropTypes from "prop-types";
import { useTimer } from "react-timer-hook";

import { Text } from "@chakra-ui/core";

import { toMinTwoDigits } from "../../helpers/format-text";

const Timer = ({ children }) => (
  <Text lineHeight={1.15} color="white" fontSize="32px" fontWeight={700}>
    {children}
  </Text>
);

// TODO: merge this component with GameInputCardTimer
const GameInputBannerTimer = ({
  expiryTimestamp,
  hasGameStarted,
  onExpire,
}) => {
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

GameInputBannerTimer.propTypes = {
  expiryTimestamp: PropTypes.number,
  hasGameStarted: PropTypes.bool,
  onExpire: PropTypes.func,
};
GameInputBannerTimer.defaultProps = {
  expiryTimestamp: null,
  hasGameStarted: false,
  onExpire: () => {},
};

export default GameInputBannerTimer;
