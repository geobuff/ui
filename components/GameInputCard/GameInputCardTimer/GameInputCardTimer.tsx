import React, { FC } from "react";
import { Box, BoxProps, Text } from "@chakra-ui/react";

import { toMinTwoDigits } from "../../../helpers/format-text";
import { secondsToMinutesString } from "../../../helpers/time";
import { ExpiryTimestamp } from "../../../types/expiry-timestamp";

export interface TimerProps extends BoxProps {
  shouldShowTitle: boolean;
}

const Timer: FC<TimerProps> = ({ children = null, shouldShowTitle = true }) => (
  <Box>
    {shouldShowTitle && <Text fontWeight="bold">{"TIME REMAINING"}</Text>}
    <Text fontWeight={800} fontSize="36px">
      {children}
    </Text>
  </Box>
);

export interface Props extends BoxProps {
  totalSeconds?: number;
  expiryTimestamp?: ExpiryTimestamp;
  hasGameStarted: boolean;
  hasGameStopped: boolean;
  shouldShowTitle?: boolean;
}

const GameInputCardTimer: FC<Props> = ({
  totalSeconds = 900,
  expiryTimestamp = { minutes: 0, seconds: 0 },
  hasGameStarted = false,
  hasGameStopped = false,
  shouldShowTitle = true,
  ...props
}) => {
  console.log(expiryTimestamp, "expiryTimestamp");

  if (hasGameStopped) {
    return (
      <Timer shouldShowTitle={shouldShowTitle} {...props}>
        {`${toMinTwoDigits(expiryTimestamp.minutes)}:${toMinTwoDigits(
          expiryTimestamp.seconds
        )}`}
      </Timer>
    );
  }

  if (!hasGameStarted) {
    return (
      <Timer shouldShowTitle={shouldShowTitle} {...props}>
        {secondsToMinutesString(totalSeconds)}
      </Timer>
    );
  }

  return (
    <Timer shouldShowTitle={shouldShowTitle} {...props}>
      {`${toMinTwoDigits(expiryTimestamp.minutes)}:${toMinTwoDigits(
        expiryTimestamp.seconds
      )}`}
    </Timer>
  );
};

export default GameInputCardTimer;
