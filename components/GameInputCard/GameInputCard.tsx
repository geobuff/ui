import React, { FC, createRef, useContext, useEffect } from "react";

import { SolidCloseCircle } from "@geobuff/buff-ui/components";
import { ResultsList } from "@geobuff/buff-ui/components";

import {
  Box,
  Button,
  Divider,
  Fade,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";

import { LanguageContext } from "../../contexts/LanguageContext";

import { ExpiryTimestamp } from "../../types/expiry-timestamp";
import { QuizTypes } from "../../types/quiz-types";
import { Result } from "../../types/result";
import GameInputCardScore from "./GameInputCardScore/GameInputCardScore";
import GameInputCardTimer from "./GameInputCardTimer/GameInputCardTimer";

const divider = <Divider borderColor="#E3E1E1" borderWidth={1} my={2} />;

export interface Props {
  typeId?: number;
  maxScore?: number;
  plural?: string;
  time?: number;
  hasFlags?: boolean;
  recents?: Result[];
  score?: number;
  expiryTimestamp?: ExpiryTimestamp;
  errorMessage?: string;
  hasGameRunOnce?: boolean;
  hasGameStarted?: boolean;
  hasGameStopped?: boolean;
  hasError?: boolean;
  inputValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClearInput?: () => void;
  onGameStart?: () => void;
  onGameStop?: () => void;
}

const GameInputCard: FC<Props> = ({
  typeId = 0,
  maxScore = 0,
  time = 0,
  plural = "",
  hasFlags = false,
  recents = [],
  score = 0,
  expiryTimestamp = { minutes: 0, seconds: 0 },
  errorMessage = "",
  hasGameRunOnce = false,
  hasGameStarted = false,
  hasGameStopped = false,
  hasError = false,
  inputValue = "",
  onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {},
  onClearInput = (): void => {},
  onGameStart = (): void => {},
  onGameStop = (): void => {},
}) => {
  const { t } = useContext(LanguageContext);

  const inputRef = createRef<HTMLInputElement>();
  const isFlagGame = typeId === QuizTypes.FLAG;

  useEffect(() => {
    if (!isFlagGame && hasGameStarted) {
      inputRef.current.focus();
    }
  }, [hasGameStarted, isFlagGame]);

  const handleClearInput = (): void => {
    onClearInput();
    inputRef.current.focus();
  };

  return (
    <Flex backgroundColor="#F0F0F0" borderRadius={12} direction="column" p={5}>
      <Box mb={5}>
        <Text fontWeight="bold">{t.global.score.toUpperCase()}</Text>
        <GameInputCardScore score={score} maxScore={maxScore} />
      </Box>
      {divider}
      {!isFlagGame && (
        <Box>
          <InputGroup position="relative">
            <Input
              ref={inputRef}
              isInvalid={hasError}
              isDisabled={!hasGameStarted}
              onChange={onChange}
              my={5}
              placeholder={`${t.global.enter} ${plural}...`}
              value={inputValue}
            />
            <Fade in={!!errorMessage} unmountOnExit>
              <Text
                fontWeight={600}
                color="red.500"
                position="absolute"
                top="60px"
                bottom={0}
                left={2}
                fontSize="xs"
              >
                {errorMessage}
              </Text>
            </Fade>
            <InputRightElement>
              {inputValue && (
                <Fade in={inputValue?.length > 0}>
                  <IconButton
                    aria-label={t.global.closeCircle}
                    position="absolute"
                    top="27px"
                    right={3}
                    maxHeight="22px"
                    minWidth="22px"
                    backgroundColor="transparent"
                    borderRadius={25}
                    onClick={handleClearInput}
                    color={hasError ? "red.500" : "#a6a6a6"}
                    fontWeight="bold"
                    _hover={{
                      backgroundColor: "transparent",
                      color: "#5c5c5c",
                    }}
                  >
                    <SolidCloseCircle height={5} width={5} padding={0} />
                  </IconButton>
                </Fade>
              )}
            </InputRightElement>
          </InputGroup>
        </Box>
      )}
      {!isFlagGame && divider}
      <Box my={4}>
        <GameInputCardTimer
          totalSeconds={time}
          expiryTimestamp={expiryTimestamp}
          hasGameStarted={hasGameStarted}
          hasGameStopped={hasGameStopped}
        />
      </Box>
      {divider}
      <Box my={4}>
        <Button
          colorScheme={hasGameStarted ? "red" : "green"}
          width="full"
          onClick={hasGameStarted ? onGameStop : onGameStart}
          p={8}
          size="lg"
        >
          <Text fontWeight="700" fontSize="24px">
            {hasGameStarted
              ? t.global.giveUp.toUpperCase()
              : hasGameRunOnce
              ? t.global.retry.toUpperCase()
              : t.global.start.toUpperCase()}
          </Text>
        </Button>
      </Box>
      {divider}
      <Box mt={4}>
        <Text fontWeight="bold">{t.global.recent.toUpperCase()}</Text>
        <ResultsList
          results={recents}
          noResultsMessage={`${t.global.no} ${plural} ${t.global.toDisplay}`}
          hasFlags={hasFlags}
        />
      </Box>
    </Flex>
  );
};

export default GameInputCard;
