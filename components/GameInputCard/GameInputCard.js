import React from "react";
import PropTypes from "prop-types";
import { Box, Button, Divider, Text, Input } from "@chakra-ui/core";

import CountryList from "../CountryList";
import GameInputCardScore from "./GameInputCardScore";
import GameInputCardTimer from "./GameInputCardTimer";

const divider = <Divider borderColor="#E3E1E1" borderWidth={1} my={2} />;

const GameInputCard = ({
  countries,
  hasGameStarted,
  score,
  timeRemaining,
  total,
}) => {
  return (
    <Box backgroundColor="#F0F0F0" borderRadius={12} p={5}>
      <Box mb={5}>
        <Text fontWeight="bold">{"SCORE"}</Text>
        <GameInputCardScore score={score} total={total} />
      </Box>

      {divider}
      <Input my={5} placeholder="Enter Country" />
      {divider}

      <Box my={4}>
        <GameInputCardTimer expiryTimestamp={timeRemaining} />
      </Box>

      {divider}

      <Box my={4}>
        <Button
          colorScheme={hasGameStarted ? "red" : "green"}
          isFullWidth
          p={8}
          size="lg"
        >
          <Text fontWeight="700" fontSize="24px">
            {hasGameStarted ? "GIVE UP" : "START"}
          </Text>
        </Button>
      </Box>

      {divider}

      <Box mt={4}>
        <Text fontWeight="bold" mb={1}>
          {"RECENT"}
        </Text>
        <CountryList countries={countries} />
      </Box>
    </Box>
  );
};

GameInputCard.propTypes = {
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string,
    })
  ),
  hasGameStarted: PropTypes.bool,
  score: PropTypes.number,
  timeRemaining: PropTypes.number,
  total: PropTypes.number,
};
GameInputCard.defaultProps = {
  countries: [],
  hasGameStarted: false,
  score: 0,
  total: 0,
};

export default React.memo(GameInputCard);
