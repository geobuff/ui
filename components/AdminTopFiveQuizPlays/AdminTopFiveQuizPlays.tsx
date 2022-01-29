import React, { FC } from "react";
import { Box, Flex, Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import TableCell from "../TableCell";
import { PlaysDto } from "../../types/plays-dto";

export interface Props {
  quizPlays?: PlaysDto[];
}

const AdminTopFiveQuizPlays: FC<Props> = ({ quizPlays = [] }) => {
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
              <Th textAlign="left">{"QUIZ"} </Th>
              <Th textAlign="left">{"PLAYS"}</Th>
            </Tr>
          </Thead>

          <Tbody>
            {quizPlays.map((entry, index) => (
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

export default AdminTopFiveQuizPlays;
