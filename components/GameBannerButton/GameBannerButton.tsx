import React, { FC } from "react";
import { Button, ButtonProps, Text } from "@chakra-ui/react";

export interface Props extends ButtonProps {
  hasGameRunOnce: boolean;
  hasGameStarted: boolean;
  onGameStart: () => void;
  onGameStop: () => void;
}

const GameBannerButton: FC<Props> = ({
  hasGameStarted = false,
  hasGameRunOnce = false,
  onGameStart,
  onGameStop,
  ...props
}) => {
  return (
    <Button
      colorScheme={hasGameStarted ? "red" : "green"}
      width="full"
      onClick={hasGameStarted ? onGameStop : onGameStart}
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.08)"
      padding={7}
      borderRadius={0}
      size="md"
      {...props}
    >
      <Text fontWeight="700" fontSize="22px">
        {hasGameStarted ? "GIVE UP" : hasGameRunOnce ? "RETRY" : "START"}
      </Text>
    </Button>
  );
};

export default GameBannerButton;
