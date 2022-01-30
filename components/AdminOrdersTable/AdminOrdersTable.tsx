import React, { FC } from "react";
import {
  Box,
  Button,
  Flex,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Order } from "../../types/order";
import TableCell from "../TableCell";

export interface Props {
  orders?: Order[];
  isSubmitting?: boolean;
  onProgressToShipped?: (orderId: number) => void;
}

const AdminOrdersTable: FC<Props> = ({
  orders = [],
  isSubmitting = false,
  onProgressToShipped = (orderId: number): void => {},
}) => {
  return (
    <Flex
      margin={6}
      background="white"
      borderRadius={12}
      justifyContent="center"
    >
      <Box overflow="auto" margin={6}>
        <Table size="md" variant="striped" colorscheme="gray">
          <Thead>
            <Tr>
              <Th textAlign="left">{"NAME"} </Th>
              <Th textAlign="left">{"ADDED"} </Th>
              <Th>{""}</Th>
            </Tr>
          </Thead>

          <Tbody>
            {orders?.map((order, index) => (
              <Tr key={index} fontWeight={600}>
                <TableCell paddingY={3} paddingX={6}>
                  {`${order.firstName} ${order.lastName}`}
                </TableCell>
                <TableCell paddingY={3} paddingX={6}>
                  {order.added}
                </TableCell>
                <TableCell paddingY={3} paddingX={6}>
                  <Button
                    colorScheme="blue"
                    disabled={isSubmitting}
                    onClick={() => onProgressToShipped(order.id)}
                  >
                    PROGRESS TO SHIPPED
                  </Button>
                </TableCell>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Flex>
  );
};

export default AdminOrdersTable;
