import React from "react";
import {
  Box,
  Skeleton,
  Heading,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";

const UserProfileLeaderboardEntriesPlaceholder = () => (
  <Box>
    <Skeleton>
      <Heading size="md" m={6}>
        Leaderboard Entries
      </Heading>
    </Skeleton>
    <Box my={6}>
      <Table>
        <Skeleton>
          <Thead>
            <Tr>
              <Th>HEADER</Th>
            </Tr>
          </Thead>
        </Skeleton>
        <Skeleton>
          <Tbody>
            <Tr>
              <Td>ENTRY</Td>
            </Tr>
          </Tbody>
        </Skeleton>
        <Skeleton>
          <Tbody>
            <Tr>
              <Td>ENTRY</Td>
            </Tr>
          </Tbody>
        </Skeleton>
      </Table>
    </Box>
  </Box>
);

export default UserProfileLeaderboardEntriesPlaceholder;
