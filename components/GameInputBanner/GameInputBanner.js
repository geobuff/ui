import React from "react";
import PropTypes from "prop-types";

import {
  Box,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";

import { CloseIcon } from "@chakra-ui/icons";

import GameInputBannerTimer from "./GameInputBannerTimer";
import GameInputBannerError from "./GameInputBannerError";

const GameInputBanner = ({
  quiz,
  score,
  errorMessage,
  expiryTimestamp,
  hasError,
  hasGameStarted,
  hasGameStopped,
  inputValue,
  onChange,
  onClearInput,
}) => {
  return (
    <>
      <Flex
        alignItems="center"
        backgroundColor="#27AE60"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.08)"
        px={3}
        py={2}
        zIndex={10}
      >
        <Box textAlign="center" mr={3}>
          <GameInputBannerTimer
            expiryTimestamp={expiryTimestamp}
            hasGameStarted={hasGameStarted}
            hasGameStopped={hasGameStopped}
            totalSeconds={quiz.time}
          />
          <Text
            color="white"
            fontSize="12px"
            fontWeight={700}
            minWidth="125px"
            width="100%"
          >
            {`${score} of ${quiz.maxScore} ${quiz.verb}`}
          </Text>
        </Box>
        <InputGroup>
          <Input
            isDisabled={!hasGameStarted}
            isInvalid={hasError}
            placeholder={`Enter ${quiz.verb}...`}
            onChange={onChange}
            value={inputValue}
          />
          <InputRightElement>
            <IconButton
              color="red.400"
              backgroundColor="transparent"
              borderRadius={25}
              display={hasError ? "flex" : "none"}
              onClick={onClearInput}
              maxHeight="22px"
              minWidth="22px"
              mr={2}
              _hover={{ backgroundColor: "gray.100" }}
            >
              <CloseIcon p={0} height={3} width={3} />
            </IconButton>
          </InputRightElement>
        </InputGroup>
      </Flex>
      <Box>
        <GameInputBannerError errorMessage={errorMessage} />
      </Box>
    </>
  );
};

GameInputBanner.propTypes = {
  quiz: PropTypes.shape({
    id: PropTypes.number,
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
  score: PropTypes.number,
  errorMessage: PropTypes.string,
  expiryTimestamp: PropTypes.shape({
    minutes: PropTypes.number,
    seconds: PropTypes.number,
  }),
  hasError: PropTypes.bool,
  hasGameStarted: PropTypes.bool,
  hasGameStopped: PropTypes.bool,
  inputValue: PropTypes.string,
  onChange: PropTypes.func,
  onClearInput: PropTypes.func,
};
GameInputBanner.defaultProps = {
  quiz: {},
  score: 0,
  errorMessage: "",
  expiryTimestamp: null,
  hasError: false,
  hasGameStarted: false,
  hasGameStopped: false,
  inputValue: "",
  onChange: () => {},
  onClearInput: () => {},
};

export default GameInputBanner;
