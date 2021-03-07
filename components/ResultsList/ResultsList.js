import React from "react";
import PropTypes from "prop-types";

import ResultsListItem from "../ResultsListItem";
import { Box, List, Text } from "@chakra-ui/react";

const ResultsList = ({ quiz, results }) => {
  if (!results || results.length === 0) {
    return (
      <Box backgroundColor="#F0F0F0" borderRadius={12} p={5}>
        <Text textAlign="center" opacity={0.5} fontWeight={500}>
          No {quiz.verb} to display
        </Text>
      </Box>
    );
  }

  return (
    <List>
      {results.map((result) => (
        <ResultsListItem
          quizId={quiz.id}
          key={result.code}
          my={2}
          isHidden={!result.checked}
          {...result}
        />
      ))}
    </List>
  );
};

ResultsList.propTypes = {
  quiz: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    maxScore: PropTypes.number,
    imageUrl: PropTypes.string,
    verb: PropTypes.string,
    apiPath: PropTypes.string,
    hasLeaderboard: PropTypes.bool,
    enabled: PropTypes.bool,
  }),
  results: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string,
    })
  ),
};
ResultsList.defaultProps = {
  quiz: {},
  results: [],
};

export default ResultsList;
