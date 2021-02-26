import React from "react";
import PropTypes from "prop-types";

import ResultsListItem from "../ResultsListItem";
import { Quizzes, getVerb } from "../../helpers/quizzes";
import { Box, List, Text } from "@chakra-ui/react";

const ResultsList = ({ quiz, results }) => {
  if (!results || results.length === 0) {
    return (
      <Box backgroundColor="#F0F0F0" borderRadius={12} p={5}>
        <Text textAlign="center" opacity={0.5} fontWeight={500}>
          No {getVerb(quiz)} to display
        </Text>
      </Box>
    );
  }

  return (
    <List>
      {results.map((result) => (
        <ResultsListItem
          quiz={quiz}
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
  quiz: PropTypes.number,
  results: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string,
    })
  ),
};
ResultsList.defaultProps = {
  quiz: Quizzes.CountriesOfTheWorld,
  results: [],
};

export default ResultsList;
