import React, { FC } from "react";

import ResultsListItem from "../ResultsListItem";
import { Box, Text } from "@chakra-ui/react";
import { Quiz } from "../../types/quiz";
import { Result } from "../../types/result";

interface Props {
  quiz?: Quiz;
  results?: Array<Result>;
}

const ResultsList: FC<Props> = ({ quiz={}, results=[] }) => {
  if (!results || results.length === 0) {
    return (
      <Box backgroundColor="#F0F0F0" borderRadius={12} p={5}>
        <Text textAlign="center" opacity={0.5} fontWeight={500}>
          {`No ${quiz.verb} to display`}
        </Text>
      </Box>
    );
  }

  return (
    <Box>
      {results.map((result) => (
        <ResultsListItem
          key={result.code}
          code={result.code}
          svgName={result.svgName}
          isHidden={result.isHidden}
          isMissedResult={result.isMissedResult}
          hasFlag={quiz.hasFlags}
          shouldFadeIn
          my={1}
        />
      ))}
    </Box>
  );
};

export default ResultsList;
