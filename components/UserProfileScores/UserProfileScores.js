import React from "react";
import {
  Alert,
  Box,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { DateTime } from "luxon";

const UserProfileScores = ({ scores }) => (
  <Box>
    <Heading size="md" textAlign="center" m={6}>
      Scores
    </Heading>
    <Box my={6}>
      {scores.length === 0 ? (
        <Alert>No scores to display.</Alert>
      ) : (
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>Quiz</Th>
              <Th>Score</Th>
              <Th>Time</Th>
              <Th>Added</Th>
            </Tr>
          </Thead>
          <Tbody>
            {scores.map((x) => (
              <Tr key={x.id}>
                <Td>{x.quizName}</Td>
                <Td>{x.score}</Td>
                <Td>{x.time}</Td>
                <Td>{DateTime.fromISO(x.added).toISODate()}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
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
