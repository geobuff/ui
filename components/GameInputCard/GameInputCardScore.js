import React from "react";
import PropTypes from "prop-types";
import { Flex, Text } from "@chakra-ui/react";

const GameInputCardScore = ({ quiz, score }) => {
  return (
    <Flex alignItems="flex-end">
      <Text fontSize="56px" fontWeight={800} lineHeight="40px" mr={1} my={2}>
        {score}
      </Text>
      <Text color="#768389" fontSize="24px" fontWeight="bold">
        {`/ ${quiz.maxScore}`}
      </Text>
    </Flex>
  );
};

GameInputCardScore.propTypes = {
  quiz: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    maxScore: PropTypes.number,
    time: PropTypes.number,
    mavSVG: PropTypes.string,
    imageUrl: PropTypes.string,
    verb: PropTypes.string,
    apiPath: PropTypes.string,
    route: PropTypes.string,
    hasLeaderboard: PropTypes.bool,
    hasGrouping: PropTypes.bool,
    enabled: PropTypes.bool,
  }),
  score: PropTypes.number,
};
GameInputCardScore.defaultProps = {
  quiz: {},
  score: 0,
};

export default GameInputCardScore;
