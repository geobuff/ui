import React from "react";
import PropTypes from "prop-types";
import { Box, Divider, Text } from "@chakra-ui/react";

import ResultsList from "../../components/ResultsList/ResultsList";

const ResultsListWrapper = ({ quizId, results, verb }) => (
  <Box textAlign="left">
    <Divider my={4} />
    <Text fontSize="xl" mt={2} fontWeight="bold">
      {"Results"}
    </Text>
    <Divider my={3} />
    <Box>
      <ResultsList quizId={quizId} results={results} verb={verb} />
    </Box>
  </Box>
);

ResultsListWrapper.propTypes = {
  quizId: PropTypes.number,
  results: PropTypes.array,
  verb: PropTypes.string,
};
ResultsListWrapper.defaultProps = {
  quizId: {},
  results: [],
  verb: "data",
};

export default ResultsListWrapper;
