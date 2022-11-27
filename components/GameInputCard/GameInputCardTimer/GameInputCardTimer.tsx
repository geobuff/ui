import React, { FC, useContext } from "react";

import { Box, BoxProps, Text } from "@chakra-ui/react";

import { LanguageContext } from "../../../context/LanguageContext/LanguageContext";

import { toMinTwoDigits } from "../../../helpers/format-text";
import { secondsToMinutesString } from "../../../helpers/time";
import { ExpiryTimestamp } from "../../../types/expiry-timestamp";

export interface TimerProps extends BoxProps {
  shouldShowTitle: boolean;
}

const Timer: FC<TimerProps> = ({
  children = null,
  shouldShowTitle = true,
  ...props
}) => {
  const { t } = useContext(LanguageContext);

  return (
    <Box {...props}>
      {shouldShowTitle && (
        <Text fontWeight="bold">{t.global.timeRemaining.toUpperCase()}</Text>
      )}
      <Text fontWeight={800} fontSize={props?.fontSize || "36px"}>
        {children}
      </Text>
    </Box>
  );
};

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
