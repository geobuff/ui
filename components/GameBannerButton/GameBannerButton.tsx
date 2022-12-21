import React, { FC, useContext } from "react";

import { Button, ButtonProps, Text } from "@chakra-ui/react";

import { LanguageContext } from "../../contexts/LanguageContext";

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
  const { t } = useContext(LanguageContext);

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
        {hasGameStarted
          ? t.global.giveUp.toUpperCase()
          : hasGameRunOnce
          ? t.global.retry.toUpperCase()
          : t.global.start.toUpperCase()}
      </Text>
    </Button>
  );
};

export default GameBannerButton;
