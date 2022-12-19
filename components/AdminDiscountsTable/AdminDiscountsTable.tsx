import React, { FC } from "react";

import { Card } from "@geobuff/buff-ui/components";

import {
  Box,
  Divider,
  Flex,
  Heading,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import AdminDiscountsTablePlaceholder from "../../placeholders/AdminDiscountsTablePlaceholder";
import { Discount } from "../../types/discount";
import TableCell from "../Table/TableCell";

export interface Props {
  discounts?: Discount[];
  isLoading?: boolean;
}

const AdminDiscountsTable: FC<Props> = ({
  discounts = [],
  isLoading = true,
}) => (
  <Card marginY={10} padding={6}>
    <Flex
      justifyContent="space-between"
      alignItems="center"
      marginBottom={5}
      marginX={2}
    >
      <Heading fontSize="24px">{"Discounts"}</Heading>
    </Flex>

    <Divider borderWidth={1} marginBottom={4} />

    <Box overflow="auto" margin={6}>
      {isLoading ? (
        <AdminDiscountsTablePlaceholder />
      ) : (
        <Table size="md" variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th textAlign="left">{"ID"} </Th>
              <Th textAlign="left">{"MERCH ID"}</Th>
              <Th textAlign="left">{"CODE"}</Th>
              <Th textAlign="right">{"AMOUNT"}</Th>
            </Tr>
          </Thead>

          <Tbody>
            {discounts.map((entry, index) => (
              <Tr key={index} fontWeight={600}>
                <TableCell paddingY={3} paddingX={6}>
                  {entry.id}
                </TableCell>
                <TableCell paddingY={3} paddingX={6}>
                  {entry.merchId.Valid ? entry.merchId.Int64 : "-"}
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
      )}
    </Box>
  </Card>
);

export default AdminDiscountsTable;
