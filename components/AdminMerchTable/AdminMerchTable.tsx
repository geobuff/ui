import React, { FC } from "react";

import {
  Alert,
  AlertIcon,
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

import { FlattenedMerchSize } from "../../helpers/merch";
import AdminMerchTablePlaceholder from "../../placeholders/AdminMerchTablePlaceholder";
import Card from "../Card";
import TableCell from "../Table/TableCell";

export interface Props {
  merch?: FlattenedMerchSize[];
  isLoading?: boolean;
}

const AdminMerchTable: FC<Props> = ({ merch = [], isLoading = true }) => {
  const getTable = (): JSX.Element => {
    if (merch.length === 0) {
      return (
        <Alert status="info" borderRadius={6} marginBottom={3}>
          <AlertIcon />
          No merch to display.
        </Alert>
      );
    }

    return (
      <Table size="md" variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th textAlign="left">{"SIZE"}</Th>
            <Th textAlign="right">{"PRICE"}</Th>
            <Th textAlign="right">{"QUANTITY"}</Th>
          </Tr>
        </Thead>

        <Tbody>
          {merch.map((item, index) => (
            <Tr key={index} fontWeight={600}>
              <TableCell paddingY={3} paddingX={6}>
                {`${item.name} - ${item.size}`}
              </TableCell>
              <TableCell isNumeric paddingY={3} paddingX={6}>
                {item.price.Valid && item.price.Float64}
              </TableCell>
              <TableCell isNumeric paddingY={3} paddingX={6}>
                {item.quantity}
              </TableCell>
            </Tr>
          ))}
        </Tbody>
      </Table>
    );
  };

  return (
    <Card marginY={10} padding={6}>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        marginBottom={5}
        marginX={2}
      >
        <Heading fontSize="24px">{"Inventory"}</Heading>
      </Flex>

      <Divider borderWidth={1} marginBottom={4} />

      <Box overflow="auto" margin={6}>
        {isLoading ? <AdminMerchTablePlaceholder /> : getTable()}
      </Box>
    </Card>
  );
};

export default AdminMerchTable;
