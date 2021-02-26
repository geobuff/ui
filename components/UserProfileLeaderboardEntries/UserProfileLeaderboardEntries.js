import React from "react";
import PropTypes from "prop-types";
import { Box, Text } from "@chakra-ui/react";

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
          <th>Ranking</th>
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
            <td>{entry.ranking}</td>
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
      ranking: PropTypes.number,
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
