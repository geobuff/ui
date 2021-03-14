import React from "react";
import PropTypes from "prop-types";
import { Skeleton, Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";

const LeaderboardTablePlaceholder = ({ noOfLines }) => (
  <Skeleton>
    <Table>
      <Thead>
        <Tr>
          <Th>HEADER</Th>
        </Tr>
      </Thead>
      <Tbody>
        {[...Array(noOfLines)].map((_, i) => (
          <Tr key={i}>
            <Td>ENTRY</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  </Skeleton>
);

LeaderboardTablePlaceholder.propTypes = {
  noOfLines: PropTypes.number,
};

export default LeaderboardTablePlaceholder;
