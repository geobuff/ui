import React from "react";
import PropTypes from "prop-types";
import { Box, Text, SkeletonText, Divider } from "@chakra-ui/core";

const ResultsListPlaceholder = (noOfLines) => (
  <Box>
    <Divider my={4} />
    <Text fontSize="xl" mt={2} fontWeight="bold">
      {"Results"}
    </Text>
    <Divider my={3} />
    <SkeletonText noOfLines={noOfLines} mb={3} />
  </Box>
);

ResultsListPlaceholder.propTypes = {
  noOfLines: PropTypes.number,
};

export default ResultsListPlaceholder;
