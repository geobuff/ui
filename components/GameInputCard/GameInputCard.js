import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

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

const divider = <Divider borderColor="#E3E1E1" borderWidth={1} my={2} />;

const GameInputCard = ({
  quiz,
  recents,
  score,
  timeRemaining,
  errorMessage,
  hasGameRunOnce,
  hasGameStarted,
  hasGameStopped,
  hasError,
  inputValue,
  onChange,
  onClearInput,
  onGameStart,
  onGameStop,
}) => {
  const inputRef = useRef("");

  useEffect(() => {
    if (hasGameStarted) {
      inputRef.current.focus();
    }
  }, [hasGameStarted]);

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
              <Fade in={inputValue?.length > 0} out={inputValue?.length}>
                <IconButton
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
                  _hover={{ backgroundColor: "transparent", color: "#5c5c5c" }}
                >
                  <SolidCloseCircle height={5} width={5} padding={0} />
                </IconButton>
              </Fade>
            )}
          </InputRightElement>
        </InputGroup>
      </Box>
      {divider}
      <Box my={4}>
        <GameInputCardTimer
          totalSeconds={quiz.time}
          expiryTimestamp={timeRemaining}
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

GameInputCard.propTypes = {
  quiz: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.number,
    name: PropTypes.string,
    maxScore: PropTypes.number,
    time: PropTypes.number,
    mapSVG: PropTypes.string,
    imageUrl: PropTypes.string,
    verb: PropTypes.string,
    apiPath: PropTypes.string,
    route: PropTypes.string,
    hasLeaderboard: PropTypes.bool,
    hasGrouping: PropTypes.bool,
    hasFlags: PropTypes.bool,
    enabled: PropTypes.bool,
  }),
  recents: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string,
    })
  ),
  score: PropTypes.number,
  timeRemaining: PropTypes.shape({
    minute: PropTypes.number,
    seconds: PropTypes.number,
  }),
  errorMessage: PropTypes.string,
  hasError: PropTypes.bool,
  hasGameRunOnce: PropTypes.bool,
  hasGameStarted: PropTypes.bool,
  hasGameStopped: PropTypes.bool,
  inputValue: PropTypes.string,
  onChange: PropTypes.func,
  onClearInput: PropTypes.func,
  onGameStart: PropTypes.func,
  onGameStop: PropTypes.func,
};

GameInputCard.defaultProps = {
  quiz: {},
  recents: [],
  score: 0,
  timeRemaining: 0,
  errorMessage: "",
  hasError: false,
  hasGameRunOnce: false,
  hasGameStarted: false,
  hasGameStopped: false,
  inputValue: "",
  onChange: () => {},
  onClearInput: () => {},
  onGameStart: () => {},
  onGameStop: () => {},
};

export default GameInputCard;
