import React from "react";
import PropTypes from "prop-types";
import { Box, Divider, Text } from "@chakra-ui/react";

import ResultsList from "../ResultsList";
import { mergeArrayByName } from "../../helpers/array";

const ResultsMap = ({ quiz, results, map }) => {
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
              quiz={quiz}
              results={mergeArrayByName(value, results)}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

ResultsMap.propTypes = {
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
  results: PropTypes.array,
  map: PropTypes.object,
};
ResultsMap.defaultProps = {
  quiz: {},
  results: [],
  map: {},
};

export default React.memo(ResultsMap);
