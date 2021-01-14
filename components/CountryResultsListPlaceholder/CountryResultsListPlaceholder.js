import React from "react";
import { Box, Text, SkeletonText, Divider } from "@chakra-ui/core";

const CountryResultsListPlaceholder = () => (
  <Box>
    <Divider my={4} />
    <Text fontSize="xl" mt={2} fontWeight="bold">
      {"Results"}
    </Text>
    <Divider my={3} />
    <SkeletonText noOfLines={197} mb={3} />
  </Box>
);

export default CountryResultsListPlaceholder;
