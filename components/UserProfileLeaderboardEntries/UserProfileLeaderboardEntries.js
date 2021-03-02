import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Heading,
  Table,
  Tbody,
  Thead,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import moment from "moment";

const UserProfileLeaderboardEntries = ({ entries }) => (
  <Box>
    <Heading size="md" textAlign="center" m={6}>
      Leaderboard Entries
    </Heading>
    <Table variant="striped" colorScheme="gray" my={6}>
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
            <Td>{entry.time}</Td>
            <Td>{moment(entry.added).format("DD-MM-YYYY")}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
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
