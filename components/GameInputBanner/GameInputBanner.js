import React, { useRef } from "react";
import PropTypes from "prop-types";

import {
  Box,
  Fade,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Tooltip,
} from "@chakra-ui/react";

import SolidCloseCircle from "../../Icons/SolidCloseCircle";

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
  const inputRef = useRef("");

  const handleClearInput = () => {
    onClearInput();
    inputRef.current.focus();
  };

  const scoreLabel = `${score} of ${quiz.maxScore} ${quiz.verb}`;

  const scoreNode = (
    <>
      {scoreLabel?.length > 23 ? (
        <Tooltip label={quiz.verb}>
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
              maxWidth="140px"
              width="100%"
              isTruncated
            >
              {scoreLabel}
            </Text>
          </Box>
        </Tooltip>
      ) : (
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
            maxWidth="140px"
            width="100%"
            isTruncated
          >
            {scoreLabel}
          </Text>
        </Box>
      )}
    </>
  );

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
        {scoreNode}

        <InputGroup>
          <Input
            ref={inputRef}
            isDisabled={!hasGameStarted}
            isInvalid={hasError}
            placeholder={`Enter ${quiz.verb}...`}
            onChange={onChange}
            value={inputValue}
          />
          <InputRightElement>
            <Fade in={inputValue?.length > 0} out={inputValue?.length}>
              <IconButton
                right={3}
                maxHeight="22px"
                minWidth="22px"
                marginBottom="2px"
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
