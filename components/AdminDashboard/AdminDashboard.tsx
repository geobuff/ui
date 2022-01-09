import React, { FC } from "react";
import {
  Text,
  SimpleGrid,
  Table,
  Box,
  Thead,
  Tr,
  Th,
  Tbody,
  AlertIcon,
  Alert,
  Flex,
  Heading,
} from "@chakra-ui/react";

import { AdminDashboardData } from "../../types/admin-dashboard-data";
import TableCell from "../TableCell";

export interface Props {
  data?: AdminDashboardData;
  error?: boolean;
}

const AdminDashboard: FC<Props> = ({ data = null, error = false }) => {
  if (error) {
    return (
      <Alert status="error" borderRadius={6}>
        <AlertIcon />
        {`Error loading admin data.`}
      </Alert>
    );
  }

  return (
    <SimpleGrid columns={2}>
      <Flex
        margin={6}
        background="white"
        borderRadius={12}
        justifyContent="center"
      >
        <Flex direction="column" justifyContent="center">
          <Heading>{data?.userCount}</Heading>
          <Text fontWeight={600}>TOTAL USERS</Text>
        </Flex>
      </Flex>

      <Flex
        margin={6}
        background="white"
        borderRadius={12}
        justifyContent="center"
      >
        <Flex direction="column" justifyContent="center">
          <Box overflow="auto" my={6}>
            <Table size="md" variant="striped" colorscheme="gray">
              <Thead>
                <Tr>
                  <Th textAlign="left">{"ID"} </Th>
                  <Th textAlign="left">{"MERCH ID"}</Th>
                  <Th textAlign="right">{"CODE"}</Th>
                  <Th textAlign="right">{"AMOUNT"}</Th>
                </Tr>
              </Thead>

              <Tbody>
                {data?.discounts.map((entry, index) => (
                  <Tr key={index} fontWeight={600}>
                    <TableCell isNumeric paddingY={3} paddingX={6}>
                      {entry.id}
                    </TableCell>
                    <TableCell isNumeric paddingY={3} paddingX={6}>
                      {entry.merchId.Valid && entry.merchId.Int64}
                    </TableCell>
                    <TableCell paddingY={3} paddingX={6}>
                      {entry.code}
                    </TableCell>
                    <TableCell isNumeric paddingY={3} paddingX={6}>
                      {entry.amount}
                    </TableCell>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Flex>
      </Flex>

      <Flex
        margin={6}
        background="white"
        borderRadius={12}
        justifyContent="center"
      >
        <Flex direction="column" justifyContent="center">
          <Box overflow="auto" my={6}>
            <Table size="md" variant="striped" colorscheme="gray">
              <Thead>
                <Tr>
                  <Th textAlign="left">{"QUIZ"} </Th>
                  <Th textAlign="left">{"PLAYS"}</Th>
                </Tr>
              </Thead>

              <Tbody>
                {data?.quizPlays.map((entry, index) => (
                  <Tr key={index} fontWeight={600}>
                    <TableCell paddingY={3} paddingX={6}>
                      {entry.name}
                    </TableCell>
                    <TableCell isNumeric paddingY={3} paddingX={6}>
                      {entry.plays}
                    </TableCell>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Flex>
      </Flex>

      <Flex
        margin={6}
        background="white"
        borderRadius={12}
        justifyContent="center"
      >
        <Flex direction="column" justifyContent="center">
          <Box overflow="auto" my={6}>
            <Table size="md" variant="striped" colorscheme="gray">
              <Thead>
                <Tr>
                  <Th textAlign="left">{"TRIVIA"} </Th>
                  <Th textAlign="left">{"PLAYS"}</Th>
                </Tr>
              </Thead>

              <Tbody>
                {data?.triviaPlays.map((entry, index) => (
                  <Tr key={index} fontWeight={600}>
                    <TableCell paddingY={3} paddingX={6}>
                      {entry.name}
                    </TableCell>
                    <TableCell isNumeric paddingY={3} paddingX={6}>
                      {entry.plays}
                    </TableCell>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Flex>
      </Flex>
    </SimpleGrid>
  );
};

export default AdminDashboard;
