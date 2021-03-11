import React from "react";
import PropTypes from "prop-types";
import { Box, Divider, Text } from "@chakra-ui/react";

import ResultsList from "../../components/ResultsList/ResultsList";

const ResultsListWrapper = ({ quizId, results }) => (
  <Box textAlign="left">
    <Divider my={4} />
    <Text fontSize="xl" mt={2} fontWeight="bold">
      {"Results"}
    </Text>
    <Divider my={3} />
    <Box>
      <ResultsList quizId={quizId} results={results} />
    </Box>
  </Box>
);

ResultsListWrapper.propTypes = {
  quizId: PropTypes.number,
  results: PropTypes.array,
};
ResultsListWrapper.defaultProps = {
  quizId: 1,
  results: [],
};

export default ResultsListWrapper;
