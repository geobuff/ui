import React, { FC } from "react";

import { BoxProps, Text } from "@chakra-ui/react";

import { toMinTwoDigits } from "../../../helpers/format-text";
import { secondsToMinutesString } from "../../../helpers/time";
import { ExpiryTimestamp } from "../../../types/expiry-timestamp";

const Timer: FC = ({ children, ...props }) => (
  <Text
    lineHeight={1.15}
    color="white"
    fontSize="32px"
    fontWeight={700}
    {...props}
  >
    {children}
  </Text>
);

export interface Props extends BoxProps {
  totalSeconds?: number;
  expiryTimestamp?: ExpiryTimestamp;
  hasGameStarted?: boolean;
  hasGameStopped?: boolean;
}

const GameInputBannerTimer: FC<Props> = ({
  totalSeconds = 900,
  expiryTimestamp = { minutes: 0, seconds: 0 },
  hasGameStarted = false,
  hasGameStopped = false,
  ...props
}) => {
  if (hasGameStopped) {
    return (
      <Timer {...props}>
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

export default GameInputBannerTimer;
