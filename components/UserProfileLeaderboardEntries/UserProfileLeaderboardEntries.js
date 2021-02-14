import React from "react";
import PropTypes from "prop-types";
import { Box, Text } from "@chakra-ui/core";

const UserProfileLeaderboardEntries = ({ entries, quizzes }) => (
  <Box>
    <Text>Leaderboard Entries</Text>
    <table>
      <thead>
        <tr>
          <th>Quiz</th>
          <th>UserId</th>
          <th>Country Code</th>
          <th>Score</th>
          <th>Time</th>
          <th>Added</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((entry) => (
          <tr key={entry.quizId}>
            <td>{quizzes.filter((x) => x.id === entry.quizId)[0].name}</td>
            <td>{entry.userId}</td>
            <td>{entry.countryCode}</td>
            <td>{entry.score}</td>
            <td>{entry.time}</td>
            <td>{entry.added}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </Box>
);

UserProfileLeaderboardEntries.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      userId: PropTypes.number,
      quizId: PropTypes.number,
      countryCode: PropTypes.string,
      score: PropTypes.number,
      time: PropTypes.number,
      added: PropTypes.time,
    })
  ),
  quizzes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      description: PropTypes.string,
      code: PropTypes.string,
      maxScore: PropTypes.number,
      enabled: PropTypes.bool,
    })
  ),
};

export default UserProfileLeaderboardEntries;
