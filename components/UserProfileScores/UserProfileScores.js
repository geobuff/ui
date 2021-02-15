import React from "react";
import { Box, Text } from "@chakra-ui/core";
import PropTypes from "prop-types";

const UserProfileScores = ({ scores }) => (
  <Box>
    <Text>Scores</Text>
    <table>
      <thead>
        <tr>
          <th>User</th>
          <th>Quiz</th>
          <th>Score</th>
          <th>Time</th>
          <th>Added</th>
        </tr>
      </thead>
      <tbody>
        {scores.map((x) => (
          <tr key={x.id}>
            <td>{x.userId}</td>
            <td>{x.quizId}</td>
            <td>{x.score}</td>
            <td>{x.time}</td>
            <td>{x.added}</td>
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
      time: PropTypes.number,
      added: PropTypes.time,
    })
  ),
};

export default UserProfileScores;
