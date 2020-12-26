import React from "react";
import PropTypes from "prop-types";
import { Box, Divider, Text, Input } from "@chakra-ui/core";

import CountryList from "../CountryList";
import GameScoreInline from "../GameScoreInline";

const divider = <Divider borderColor="#E3E1E1" borderWidth={1} my={2} />;

const GameInputCard = ({ countries, score, total }) => {
  return (
    <Box backgroundColor="#F0F0F0" borderRadius={12} p={5}>
      <Box mb={5}>
        <Text fontWeight="bold">{"SCORE"}</Text>
        <GameScoreInline score={score} total={total} />
      </Box>

      {divider}
      <Input my={5} placeholder="Enter Country" />
      {divider}

      <Box my={4}>
        <Text fontWeight="bold">{"TIME REMAINING"}</Text>
        <Text fontWeight={800} fontSize="36px">
          {"04:20:69"}
        </Text>
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
  score: PropTypes.number,
  total: PropTypes.number,
};
GameInputCard.defaultProps = {
  countries: [],
  score: 0,
  total: 0,
};

export default GameInputCard;
