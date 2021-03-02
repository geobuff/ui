import React from "react";
import {
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
import moment from "moment";

const UserProfileScores = ({ scores }) => (
  <Box>
    <Heading size="md" textAlign="center" m={6}>
      Scores
    </Heading>
    <Table variant="striped" colorScheme="gray" my={6}>
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
            <Td>{moment(x.added).format("DD-MM-YYYY")}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
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
