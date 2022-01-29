import React, { FC } from "react";
import { Box, Flex, Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { PlaysDto } from "../../types/plays-dto";
import TableCell from "../TableCell";

export interface Props {
  triviaPlays?: PlaysDto[];
}

const AdminLastFiveTriviaPlays: FC<Props> = ({ triviaPlays = [] }) => {
  return (
    <Flex
      margin={6}
      background="white"
      borderRadius={12}
      justifyContent="center"
    >
      <Box overflow="auto" m={6}>
        <Table size="md" variant="striped" colorscheme="gray">
          <Thead>
            <Tr>
              <Th textAlign="left">{"TRIVIA"} </Th>
              <Th textAlign="left">{"PLAYS"}</Th>
            </Tr>
          </Thead>

          <Tbody>
            {triviaPlays.map((entry, index) => (
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
  );
};

export default AdminLastFiveTriviaPlays;
