import React, { FC } from "react";
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
import TableCell from "../TableCell";
import { FlattenedMerchSize } from "../../helpers/merch";
import Card from "../Card";
import AdminMerchTablePlaceholder from "../../placeholders/AdminMerchTablePlaceholder";

export interface Props {
  merch?: FlattenedMerchSize[];
  isLoading?: boolean;
}

const AdminMerchTable: FC<Props> = ({ merch = [], isLoading = true }) => (
  <Card marginY={10} padding={6}>
    <Flex
      justifyContent="space-between"
      alignItems="center"
      marginBottom={5}
      marginX={2}
    >
      <Heading fontSize="24px">{"Merch"}</Heading>
    </Flex>

    <Divider borderWidth={1} marginBottom={4} />

    <Box overflow="auto" margin={6}>
      {isLoading ? (
        <AdminMerchTablePlaceholder />
      ) : (
        <Table size="md" variant="striped" colorscheme="gray">
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
      )}
    </Box>
  </Card>
);

export default AdminMerchTable;
