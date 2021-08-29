import React, { FC } from "react";

import { Text } from "@chakra-ui/react";

import { toMinTwoDigits } from "../../helpers/format-text";
import { secondsToMinutesString } from "../../helpers/time";
import { ExpiryTimestamp } from "../../types/expiry-timestamp";

const Timer: FC = ({ children = null }) => (
  <Text lineHeight={1.15} color="white" fontSize="32px" fontWeight={700}>
    {children}
  </Text>
);

export interface Props {
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

export default GameInputBannerTimer;
