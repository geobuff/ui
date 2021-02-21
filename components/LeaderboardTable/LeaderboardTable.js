import React from "react";
import PropTypes from "prop-types";
import { Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/table";

import Twemoji from "../Twemoji";
import flag from "country-code-emoji";
import { secondsToMinutesString } from "../../helpers/time";

const LeaderboardTable = ({ entries }) => (
  <Table variant="simple" w="100%">
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
          <Td>{index + 1}</Td>
          <Td>
            <Twemoji emoji={flag(entry.countryCode)} /> {entry.username}
          </Td>
          <Td>{secondsToMinutesString(entry.time)}</Td>
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
      username: PropTypes.string,
      countryCode: PropTypes.string,
      score: PropTypes.number,
      time: PropTypes.time,
      added: PropTypes.time,
    })
  ),
};

export default LeaderboardTable;
