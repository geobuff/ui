import React, { FC } from "react";
import { Box, Flex, Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { Discount } from "../../types/discount";
import TableCell from "../TableCell";

export interface Props {
  discounts?: Discount[];
}

const AdminDiscounts: FC<Props> = ({ discounts = [] }) => {
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
              <Th textAlign="left">{"ID"} </Th>
              <Th textAlign="left">{"MERCH ID"}</Th>
              <Th textAlign="right">{"CODE"}</Th>
              <Th textAlign="right">{"AMOUNT"}</Th>
            </Tr>
          </Thead>

          <Tbody>
            {discounts.map((entry, index) => (
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
  );
};

export default AdminDiscounts;
