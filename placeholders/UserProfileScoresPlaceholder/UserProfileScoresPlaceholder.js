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

const UserProfileScoresPlaceholder = () => (
  <Box>
    <Skeleton>
      <Heading size="md" m={6}>
        Scores
      </Heading>
    </Skeleton>
    <Box my={6}>
      <Skeleton>
        <Table>
          <Thead>
            <Tr>
              <Th>HEADER</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>ENTRY</Td>
            </Tr>
          </Tbody>
        </Table>
      </Skeleton>
    </Box>
  </Box>
);

export default UserProfileScoresPlaceholder;
