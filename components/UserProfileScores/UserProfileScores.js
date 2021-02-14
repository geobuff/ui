import React from "react";
import { Box, Text } from "@chakra-ui/core";
import PropTypes from "prop-types";

const UserProfileScores = ({ scores }) => (
  <Box>
    <Text>Scores</Text>
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>User</th>
          <th>Quiz</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {scores.map((x) => (
          <tr key={x.id}>
            <td>{x.id}</td>
            <td>{x.userId}</td>
            <td>{x.quizId}</td>
            <td>{x.score}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </Box>
);

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
