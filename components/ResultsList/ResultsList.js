import React from "react";
import PropTypes from "prop-types";

import ResultsListItem from "../ResultsListItem";
import { Box, Text, List } from "@chakra-ui/react";

const ResultsList = ({ quiz, results }) => {
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
    <List>
      {results.map((result) => (
        <ResultsListItem
          key={result.code}
          code={result.code}
          svgName={result.svgName}
          isHidden={result.isHidden}
          isMissedResult={result.isMissedResult}
          hasFlag={quiz.hasFlags}
          my={2}
        />
      ))}
    </List>
  );
};

ResultsList.propTypes = {
  quiz: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.number,
    name: PropTypes.string,
    maxScore: PropTypes.number,
    time: PropTypes.number,
    mapSVG: PropTypes.string,
    imageUrl: PropTypes.string,
    verb: PropTypes.string,
    apiPath: PropTypes.string,
    route: PropTypes.string,
    hasLeaderboard: PropTypes.bool,
    hasGrouping: PropTypes.bool,
    hasFlags: PropTypes.bool,
    enabled: PropTypes.bool,
  }),
  results: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string,
      svgName: PropTypes.string,
      isHidden: PropTypes.bool,
      isMissedResult: PropTypes.bool,
    })
  ),
};
ResultsList.defaultProps = {
  quiz: {},
  results: [],
};

export default ResultsList;
