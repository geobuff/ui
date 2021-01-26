import React from "react";
import PropTypes from "prop-types";

import { Box, Flex, Input, Text } from "@chakra-ui/core";

import GameInputBannerTimer from "./GameInputBannerTimer";
import GameInputBannerError from "./GameInputBannerError";

const GameInputBanner = ({
  errorMessage,
  expiryTimestamp,
  hasError,
  hasGameStarted,
  inputValue,
  onChange,
  onExpire,
  score,
  total,
  verb,
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
            {`${score} of ${total} ${verb}`}
          </Text>
        </Box>
        <Input
          isDisabled={!hasGameStarted}
          isInvalid={hasError}
          placeholder="Enter country"
          onChange={onChange}
          value={inputValue}
        />
      </Flex>
      <Box>
        <GameInputBannerError errorMessage={errorMessage} />
      </Box>
    </>
  );
};

GameInputBanner.propTypes = {
  errorMessage: PropTypes.string,
  expiryTimestamp: PropTypes.number,
  hasError: PropTypes.bool,
  hasGameStarted: PropTypes.bool,
  inputValue: PropTypes.string,
  onChange: PropTypes.func,
  onExpire: PropTypes.func,
  score: PropTypes.number,
  total: PropTypes.number,
  verb: PropTypes.string,
};
GameInputBanner.defaultProps = {
  errorMessage: "",
  expiryTimestamp: null,
  hasError: false,
  hasGameStarted: false,
  inputValue: "",
  onChange: () => {},
  onExpire: () => {},
  score: 0,
  total: 0,
  verb: "countries",
};

export default GameInputBanner;
