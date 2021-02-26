import React from "react";
import PropTypes from "prop-types";
import { Stack, Skeleton } from "@chakra-ui/react";

const LeaderboardTablePlaceholder = ({ noOfLines }) => (
  <Stack>
    {[...Array(noOfLines)].map((_, i) => (
      <Skeleton key={i} height="20px" />
    ))}
  </Stack>
);

LeaderboardTablePlaceholder.propTypes = {
  noOfLines: PropTypes.number,
};

export default LeaderboardTablePlaceholder;
