import React from "react";
import PropTypes from "prop-types";
import { Box } from "@chakra-ui/core";

const UserProfileLeaderboardEntries = ({ entries, quizzes }) => (
  <Box>
    <table>
      <thead>
        <tr>
          <th>Quiz</th>
          <th>UserId</th>
          <th>Country</th>
          <th>Countries</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((entry) => (
          <tr key={entry.id}>
            <td>{quizzes.filter((x) => x.id === entry.id)[0].name}</td>
            <td>{entry.userId}</td>
            <td>{entry.country}</td>
            <td>{entry.countries}</td>
            <td>{entry.time}</td>
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
      country: PropTypes.string,
      countries: PropTypes.number,
      time: PropTypes.number,
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
