import React, { FC } from "react";

import ResultsListItem from "../ResultsListItem";
import { Box, Text } from "@chakra-ui/react";
import { Result } from "../../types/result";

export interface Props {
  results?: Result[];
  verb?: string;
  hasFlags?: boolean;
}

const ResultsList: FC<Props> = ({
  results = [],
  verb = "",
  hasFlags = false,
}) => {
  if (!results || results.length === 0) {
    return (
      <Box backgroundColor="#F0F0F0" borderRadius={12} p={5}>
        <Text textAlign="center" opacity={0.5} fontWeight={500}>
          {`No ${verb} to display`}
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
          hasFlag={hasFlags}
          shouldFadeIn
          my={1}
        />
      ))}
    </Box>
  );
};

export default ResultsList;
