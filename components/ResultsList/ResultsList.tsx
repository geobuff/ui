import React, { FC, useContext } from "react";

import { Box, Text } from "@chakra-ui/react";

import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

import { Result } from "../../types/result";
import ResultsListItem from "../ResultsListItem";

export interface Props {
  results?: Result[];
  plural?: string;
  hasFlags?: boolean;
}

const ResultsList: FC<Props> = ({
  results = [],
  plural = "",
  hasFlags = false,
}) => {
  const { t } = useContext(LanguageContext);

  if (!results || results.length === 0) {
    return (
      <Box backgroundColor="#F0F0F0" borderRadius={12} p={5}>
        <Text textAlign="center" opacity={0.5} fontWeight={500}>
          {`${t.global.no} ${plural} ${t.global.toDisplay}`}
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
          flagUrl={result.flagUrl}
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
