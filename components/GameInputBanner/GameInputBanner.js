import React from "react";
import PropTypes from "prop-types";

import {
  Box,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from "@chakra-ui/core";

import { CloseIcon } from "@chakra-ui/icons";

import GameInputBannerTimer from "./GameInputBannerTimer";
import GameInputBannerError from "./GameInputBannerError";
import { Quizzes, getTotal, getVerb } from "../../helpers/quizzes";

const GameInputBanner = ({
  quiz,
  score,
  errorMessage,
  expiryTimestamp,
  hasError,
  hasGameStarted,
  inputValue,
  onChange,
  onClearInput,
  onExpire,
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
            onExpire={onExpire}
          />
          <Text
            color="white"
            fontSize="12px"
            fontWeight={700}
            minWidth="125px"
            width="100%"
          >
            {`${score} of ${getTotal(quiz)} ${getVerb(quiz)}`}
          </Text>
        </Box>
        <InputGroup>
          <InputLeftElement />
          <Input
            isDisabled={!hasGameStarted}
            isInvalid={hasError}
            placeholder={`Enter ${getVerb(quiz)}...`}
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
  quiz: PropTypes.number,
  score: PropTypes.number,
  errorMessage: PropTypes.string,
  expiryTimestamp: PropTypes.number,
  hasError: PropTypes.bool,
  hasGameStarted: PropTypes.bool,
  inputValue: PropTypes.string,
  onChange: PropTypes.func,
  onClearInput: PropTypes.func,
  onExpire: PropTypes.func,
};
GameInputBanner.defaultProps = {
  quiz: Quizzes.CountriesOfTheWorld,
  score: 0,
  errorMessage: "",
  expiryTimestamp: null,
  hasError: false,
  hasGameStarted: false,
  inputValue: "",
  onChange: () => {},
  onClearInput: () => {},
  onExpire: () => {},
};

export default GameInputBanner;
