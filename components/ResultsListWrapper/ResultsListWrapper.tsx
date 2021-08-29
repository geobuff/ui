import React, { FC } from "react";
import { Box, Divider, Text } from "@chakra-ui/react";

import ResultsList from "../ResultsList/ResultsList";
import { Quiz } from "../../types/quiz";
import { Result } from "../../types/result";

interface Props {
  quiz?: Quiz;
  results?: Result[];
}

const ResultsListWrapper: FC<Props> = ({ quiz, results = [] }) => (
  <Box textAlign="left">
    <Divider my={4} />
    <Text fontSize="xl" mt={2} fontWeight="bold">
      {"Results"}
    </Text>
    <Divider my={3} />
    <Box>
      <ResultsList
        results={results}
        quizVerb={quiz.verb}
        hasFlags={quiz.hasFlags}
      />
    </Box>
  </Box>
);

export default ResultsListWrapper;
