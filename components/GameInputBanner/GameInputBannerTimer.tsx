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
  hasGameStopped,
  totalSeconds,
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
    <Timer>
      {`${toMinTwoDigits(expiryTimestamp.minutes)}:${toMinTwoDigits(
        expiryTimestamp.seconds
      )}`}
    </Timer>
  );
};

Timer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

Timer.defaultProps = {
  children: "",
};

GameInputBannerTimer.propTypes = {
  expiryTimestamp: PropTypes.shape({
    minutes: PropTypes.number,
    seconds: PropTypes.number,
  }),
  hasGameStarted: PropTypes.bool,
  hasGameStopped: PropTypes.bool,
  totalSeconds: PropTypes.number,
};
GameInputBannerTimer.defaultProps = {
  expiryTimestamp: null,
  hasGameStarted: false,
  hasGameStopped: false,
  totalSeconds: 900,
};

export default GameInputBannerTimer;
