import React from "react";
import PropTypes from "prop-types";
import { Box, Divider, Text } from "@chakra-ui/react";

import ResultsList from "../ResultsList";
import { mergeArrayByName } from "../../helpers/array";

const ResultsMap = ({ quizId, results, map, verb }) => {
  return (
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
            <ResultsList
              quizId={quizId}
              results={mergeArrayByName(value, results)}
              verb={verb}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

ResultsMap.propTypes = {
  quizId: PropTypes.number,
  results: PropTypes.array,
  map: PropTypes.object,
  verb: PropTypes.string,
};
ResultsMap.defaultProps = {
  quizId: 1,
  results: [],
  map: {},
  verb: "data",
};

export default React.memo(ResultsMap);
