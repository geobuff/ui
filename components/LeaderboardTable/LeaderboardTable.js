import React from "react";
import PropTypes from "prop-types";
import { Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/table";

const LeaderboardTable = ({ entries }) => (
  <Table variant="simple">
    <Thead>
      <Tr>
        <Th>Rank</Th>
        <Th>Username</Th>
        <Th>Time</Th>
        <Th>Score</Th>
      </Tr>
    </Thead>
    <Tbody>
      {entries.map((entry, index) => (
        <Tr key={index}>
          <Td>{index + 1}</Td>
          <Td>{entry.userId}</Td>
          <Td>{entry.time}</Td>
          <Td>{entry.score}</Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
);

LeaderboardTable.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      userId: PropTypes.number,
      countryCode: PropTypes.string,
      score: PropTypes.number,
      time: PropTypes.time,
      added: PropTypes.time,
    })
  ),
};

export default LeaderboardTable;
