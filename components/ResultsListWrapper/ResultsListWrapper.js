import React from "react";
import PropTypes from "prop-types";
import { Box, Divider, Text } from "@chakra-ui/react";

import ResultsList from "../../components/ResultsList/ResultsList";

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
  quiz: PropTypes.shape({
    id: PropTypes.number,
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
  results: PropTypes.array,
};
ResultsListWrapper.defaultProps = {
  quiz: {},
  results: [],
};

export default ResultsListWrapper;
