import React from "react";
import PropTypes from "prop-types";
import { Alert } from "@chakra-ui/react";
import { Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";

import { secondsToMinutesString } from "../../helpers/time";

const LeaderboardTable = ({ page, limit, entries }) => {
  if (entries.length === 0) {
    return (
      <Alert status="info" borderRadius={6}>
        No entries to display.
      </Alert>
    );
  }

  return (
    <Table variant="striped" colorscheme="gray">
      <Thead>
        <Tr>
          <Th textAlign="left">RANK </Th>
          <Th textAlign="left">USERNAME</Th>
          <Th textAlign="left">TIME</Th>
          <Th textAlign="left">SCORE</Th>
        </Tr>
      </Thead>
      <Tbody>
        {entries.map((entry, index) => (
          <Tr key={index}>
            <Td>{page * limit + index + 1}</Td>
            <Td>{entry.username}</Td>
            <Td>{secondsToMinutesString(entry.time)}</Td>
            <Td>{entry.score}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

LeaderboardTable.propTypes = {
  page: PropTypes.number,
  limit: PropTypes.number,
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      userId: PropTypes.number,
      username: PropTypes.string,
      countryCode: PropTypes.string,
      score: PropTypes.number,
      time: PropTypes.time,
      added: PropTypes.time,
    })
  ),
};

export default LeaderboardTable;
