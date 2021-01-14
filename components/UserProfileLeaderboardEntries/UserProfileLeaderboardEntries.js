import React from "react";
import PropTypes from "prop-types";
import { Box, Text } from "@chakra-ui/core";

const UserProfileLeaderboardEntries = ({ entries }) => (
  <Box>
    {entries.map((x) => {
      <Text>
        {x.id} {x.userId} {x.quizId} {x.score}
      </Text>;
    })}
  </Box>
);

UserProfileLeaderboardEntries.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      userId: PropTypes.number,
      country: PropTypes.string,
      countries: PropTypes.number,
      time: PropTypes.number,
    })
  ),
};

export default UserProfileLeaderboardEntries;
