import React from "react";
import PropTypes from "prop-types";

import ResultsListItem from "../ResultsListItem";
import { Box, Text, List } from "@chakra-ui/react";

const ResultsList = ({ quizId, results, verb }) => {
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
    <List>
      {results.map((result) => (
        <ResultsListItem
          key={result.code}
          quizId={quizId}
          code={result.code}
          svgName={result.svgName}
          isHidden={!result.checked}
          my={2}
        />
      ))}
    </List>
  );
};

ResultsList.propTypes = {
  quizId: PropTypes.string,
  results: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string,
    })
  ),
  verb: PropTypes.string,
};
ResultsList.defaultProps = {
  quizId: 1,
  results: [],
  verb: "data",
};

export default ResultsList;
