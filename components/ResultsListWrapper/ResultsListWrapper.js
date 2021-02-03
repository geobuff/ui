import React from "react";
import PropTypes from "prop-types";
import { Box, Divider, Text } from "@chakra-ui/core";

import ResultsList from "../../components/ResultsList/ResultsList";
import { Quizzes } from "../../helpers/quizzes";

const ResultsListWrapper = ({ quiz, results }) => (
  <Box textAlign="left">
    <Divider my={4} />
    <Text fontSize="xl" mt={2} fontWeight="bold">
      {"Results"}
    </Text>
    <Divider my={3} />
    <Box>
      <ResultsList quiz={quiz} results={results} />
    </Box>
  </Box>
);

ResultsListWrapper.propTypes = {
  quiz: PropTypes.number,
  results: PropTypes.array,
};
ResultsListWrapper.defaultProps = {
  quiz: Quizzes.USStates,
  results: [],
};

export default ResultsListWrapper;
