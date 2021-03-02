import React from "react";
import PropTypes from "prop-types";
import { DateTime } from "luxon";

import {
  Box,
  Heading,
  Table,
  Tbody,
  Thead,
  Tr,
  Th,
  Td,
  Alert,
} from "@chakra-ui/react";

import { secondsToMinutesString } from "../../helpers/time";

const UserProfileLeaderboardEntries = ({ entries }) => (
  <Box>
    <Heading size="md" textAlign="center" m={6}>
      Leaderboard Entries
    </Heading>
    <Box my={6}>
      {entries.length === 0 ? (
        <Alert>No entries to display.</Alert>
      ) : (
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>Quiz</Th>
              <Th>Ranking</Th>
              <Th>Score</Th>
              <Th>Time</Th>
              <Th>Added</Th>
            </Tr>
          </Thead>
          <Tbody>
            {entries.map((entry) => (
              <Tr key={entry.quizId}>
                <Td>{entry.quizName}</Td>
                <Td>{entry.ranking}</Td>
                <Td>{entry.score}</Td>
                <Td>{secondsToMinutesString(entry.time)}</Td>
                <Td>{DateTime.fromISO(entry.added).toISODate()}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
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
