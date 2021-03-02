import React from "react";
import PropTypes from "prop-types";
import { Box, Text } from "@chakra-ui/react";

const UserProfileLeaderboardEntries = ({ entries }) => (
  <Box>
    <Text>Leaderboard Entries</Text>
    <table>
      <thead>
        <tr>
          <th>Quiz</th>
          <th>Ranking</th>
          <th>Score</th>
          <th>Time</th>
          <th>Added</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((entry) => (
          <tr key={entry.quizId}>
            <td>{entry.quizName}</td>
            <td>{entry.ranking}</td>
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
      quizName: PropTypes.string,
      countryCode: PropTypes.string,
      score: PropTypes.number,
      time: PropTypes.number,
      added: PropTypes.time,
      ranking: PropTypes.number,
    })
  ),
};

export default UserProfileLeaderboardEntries;
