import React from "react";
import { Box, Text } from "@chakra-ui/core";
import PropTypes from "prop-types";

const UserProfileScores = ({ scores }) => {
  return (
    <Box>
      {scores.map((x) => {
        <Text>
          {x.id} {x.userId} {x.quizId} {x.score}
        </Text>;
      })}
    </Box>
  );
};

UserProfileScores.propTypes = {
  scores: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      userId: PropTypes.number,
      quizId: PropTypes.number,
      score: PropTypes.number,
    })
  ),
};

export default UserProfileScores;
