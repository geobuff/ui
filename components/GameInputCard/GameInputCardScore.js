import React from "react";
import PropTypes from "prop-types";
import { Flex, Text } from "@chakra-ui/core";

const GameInputCardScore = ({ score, total }) => {
  return (
    <Flex alignItems="flex-end">
      <Text fontSize="56px" fontWeight={800} lineHeight="40px" mr={1} my={2}>
        {score}
      </Text>
      <Text color="#768389" fontSize="24px" fontWeight="bold">
        {`/ ${total}`}
      </Text>
    </Flex>
  );
};

GameInputCardScore.propTypes = {
  score: PropTypes.number,
  total: PropTypes.number,
};
GameInputCardScore.defaultProps = {
  score: 0,
  total: 0,
};

export default GameInputCardScore;
