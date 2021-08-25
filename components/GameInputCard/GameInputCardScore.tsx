import React, { FC } from "react";
import { Flex, Text } from "@chakra-ui/react";

import { Quiz } from "../../types/quiz";

interface Props {
  quiz?: Quiz;
  score?: number;
}

const GameInputCardScore: FC<Props> = ({ quiz = {}, score = 0 }) => (
  <Flex alignItems="flex-end">
    <Text fontSize="56px" fontWeight={800} lineHeight="40px" mr={1} my={2}>
      {score}
    </Text>
    <Text color="#768389" fontSize="24px" fontWeight="bold">
      {`/ ${quiz.maxScore}`}
    </Text>
  </Flex>
);

export default GameInputCardScore;
