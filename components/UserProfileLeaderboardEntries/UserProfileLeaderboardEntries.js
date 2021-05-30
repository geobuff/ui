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
  AlertIcon,
} from "@chakra-ui/react";

import Card from "../Card";

import { secondsToMinutesString } from "../../helpers/time";

const UserProfileLeaderboardEntries = ({ entries }) => (
  <Card padding={6}>
    <Heading fontSize="26px" textAlign="left" marginLeft={2} marginBottom={8}>
      {"Leaderboard Entries"}
    </Heading>
    <Box my={6}>
      {entries.length === 0 ? (
        <Alert borderRadius={6}>
          <AlertIcon />
          No entries to display.
        </Alert>
      ) : (
        <Box overflow="auto">
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
        </Box>
      )}
    </Box>
  </Card>
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
