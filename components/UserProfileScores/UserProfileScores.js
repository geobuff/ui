import React from "react";
import { Box, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

const UserProfileScores = ({ scores }) => (
  <Box>
    <Text>Scores</Text>
    <table>
      <thead>
        <tr>
          <th>Quiz</th>
          <th>Score</th>
          <th>Time</th>
          <th>Added</th>
        </tr>
      </thead>
      <tbody>
        {scores.map((x) => (
          <tr key={x.id}>
            <td>{x.quizName}</td>
            <td>{x.score}</td>
            <td>{x.time}</td>
            <td>{x.added}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </Box>
);
1;
UserProfileScores.propTypes = {
  scores: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      userId: PropTypes.number,
      quizId: PropTypes.number,
      quizName: PropTypes.string,
      score: PropTypes.number,
      time: PropTypes.number,
      added: PropTypes.time,
    })
  ),
};

export default UserProfileScores;
