import React from "react";
import PropTypes from "prop-types";
import { Box, Divider, Text } from "@chakra-ui/core";

import ResultsList from "../ResultsList";
import { mergeArrayByName } from "../../helpers/array";
import { Quizzes } from "../../helpers/quizzes";

const ResultsMap = ({ quiz, results, map }) => (
  <Box textAlign="left">
    <Divider my={4} />
    <Text fontSize="xl" mt={2} fontWeight="bold">
      {"Results"}
    </Text>
    <Divider my={3} />
    <Box>
      {Object.entries(map).map(([key, value], index) => (
        <Box mt={5} key={index}>
          <Text fontWeight="bold" my={3} textTransform="uppercase">
            {key}
          </Text>
          <ResultsList quiz={quiz} results={mergeArrayByName(value, results)} />
        </Box>
      ))}
    </Box>
  </Box>
);

ResultsMap.propTypes = {
  quiz: PropTypes.number,
  results: PropTypes.array,
  // TODO: Suss out propType for this shape
  map: PropTypes.object,
};
ResultsMap.defaultProps = {
  quiz: Quizzes.CountriesOfTheWorld,
  results: [],
  map: {},
};

export default React.memo(ResultsMap);
