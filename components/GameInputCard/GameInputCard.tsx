import React, { useEffect, createRef, FC } from "react";

import {
  Box,
  Button,
  Divider,
  Text,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Fade,
  Flex,
} from "@chakra-ui/react";

import SolidCloseCircle from "../../Icons/SolidCloseCircle";

import ResultsList from "../ResultsList";
import GameInputCardScore from "./GameInputCardScore";
import GameInputCardTimer from "./GameInputCardTimer";
import { QuizType } from "../../types/quiz-type";
import { Quiz } from "../../types/quiz";
import { Result } from "../../types/result";
import { ExpiryTimestamp } from "../../types/expiry-timestamp";

const divider = <Divider borderColor="#E3E1E1" borderWidth={1} my={2} />;

interface Props {
  quiz?: Quiz;
  recents?: Result[];
  score?: number;
  expiryTimestamp?: ExpiryTimestamp;
  errorMessage?: string;
  hasGameRunOnce?: boolean;
  hasGameStarted?: boolean;
  hasGameStopped?: boolean;
  hasError?: boolean;
  inputValue?: string;
  onChange?: any;
  onClearInput?: any;
  onGameStart?: any;
  onGameStop?: any;
}

const GameInputCard: FC<Props> = ({
  quiz = null,
  recents = [],
  score = 0,
  expiryTimestamp = { minutes: 0, seconds: 0 },
  errorMessage = "",
  hasGameRunOnce = false,
  hasGameStarted = false,
  hasGameStopped = false,
  hasError = false,
  inputValue = "",
  onChange = () => {},
  onClearInput = () => {},
  onGameStart = () => {},
  onGameStop = () => {},
}) => {
  const inputRef = createRef<HTMLInputElement>();
  const isFlagGame = quiz.type === QuizType.FLAG;

  useEffect(() => {
    if (!isFlagGame && hasGameStarted) {
      inputRef.current.focus();
    }
  }, [hasGameStarted, isFlagGame]);

  const handleClearInput = () => {
    onClearInput();
    inputRef.current.focus();
  };

  return (
    <Flex backgroundColor="#F0F0F0" borderRadius={12} direction="column" p={5}>
      <Box mb={5}>
        <Text fontWeight="bold">{"SCORE"}</Text>
        <GameInputCardScore quiz={quiz} score={score} />
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
              placeholder={`Enter ${quiz.verb}...`}
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
                    aria-label="close circle"
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
          totalSeconds={quiz.time}
          expiryTimestamp={expiryTimestamp}
          hasGameStarted={hasGameStarted}
          hasGameStopped={hasGameStopped}
        />
      </Box>
      {divider}
      <Box my={4}>
        <Button
          colorScheme={hasGameStarted ? "red" : "green"}
          isFullWidth
          onClick={hasGameStarted ? onGameStop : onGameStart}
          p={8}
          size="lg"
        >
          <Text fontWeight="700" fontSize="24px">
            {hasGameStarted ? "GIVE UP" : hasGameRunOnce ? "RETRY" : "START"}
          </Text>
        </Button>
      </Box>
      {divider}
      <Box mt={4}>
        <Text fontWeight="bold">{"RECENT"}</Text>
        <ResultsList quiz={quiz} results={recents} />
      </Box>
    </Flex>
  );
};

export default GameInputCard;
