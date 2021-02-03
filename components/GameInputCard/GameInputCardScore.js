import React from "react";
import PropTypes from "prop-types";
import { Flex, Text } from "@chakra-ui/core";
import { Quizzes, getTotal } from "../../helpers/quizzes";

const GameInputCardScore = ({ quiz, score }) => {
  return (
    <Flex alignItems="flex-end">
      <Text fontSize="56px" fontWeight={800} lineHeight="40px" mr={1} my={2}>
        {score}
      </Text>
      <Text color="#768389" fontSize="24px" fontWeight="bold">
        {`/ ${getTotal(quiz)}`}
      </Text>
    </Flex>
  );
};

GameInputCardScore.propTypes = {
  quiz: PropTypes.number,
  score: PropTypes.number,
};
GameInputCardScore.defaultProps = {
  quiz: Quizzes.CountriesOfTheWorld,
  score: 0,
};

export default GameInputCardScore;
