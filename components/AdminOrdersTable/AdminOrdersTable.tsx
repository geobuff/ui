import React, { FC } from "react";

import {
  ArrowLeft,
  ArrowRight,
  Card,
  TableCell,
} from "@geobuff/buff-ui/components";

import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Link,
  Select,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from "@chakra-ui/react";
import { DateTime } from "luxon";

import AdminOrdersTablePlaceholder from "../../placeholders/AdminOrdersTablePlaceholder";
import { Order } from "../../types/order";
import { OrderPageDto } from "../../types/order-page-dto";
import { OrderStatuses } from "../../types/order-statuses";

export interface Props {
  orderPage?: OrderPageDto;
  page?: number;
  statusId?: number;
  isLoading?: boolean;
  isSubmitting?: boolean;
  onProgressClick?: (orderId: number) => void;
  onDeleteClick?: (orderId: number) => void;
  onStatusChange?: (statusId: number) => void;
  onOrderClick?: (order: Order) => void;
  onNextPage?: () => void;
  onPreviousPage?: () => void;
}

const AdminOrdersTable: FC<Props> = ({
  orderPage = null,
  page = 0,
  statusId = 0,
  isLoading = false,
  isSubmitting = false,
  onProgressClick = (orderId: number): void => {},
  onDeleteClick = (orderId: number): void => {},
  onStatusChange = (statusId: number): void => {},
  onOrderClick = (order: Order): void => {},
  onNextPage = (): void => {},
  onPreviousPage = (): void => {},
}) => {
  const shouldRenderOnMobile = useBreakpointValue({ base: false, md: true });

  const getAction = (statusId: number, orderId: number): React.ReactNode => {
    switch (statusId) {
      case OrderStatuses.PENDING:
        return (
          <Button
            colorScheme="red"
            disabled={isSubmitting || isLoading}
            onClick={() => onDeleteClick(orderId)}
          >
            DELETE
          </Button>
        );
      case OrderStatuses.PAYMENT_RECEIVED:
        return (
          <Button
            colorScheme="blue"
            disabled={isSubmitting || isLoading}
            onClick={() => onProgressClick(orderId)}
          >
            PROGRESS
          </Button>
        );
      default:
        return null;
    }
  };

  const getTable = (): JSX.Element => {
    if (orderPage?.orders.length === 0) {
      return (
        <Alert status="info" borderRadius={6} marginBottom={3}>
          <AlertIcon />
          No orders to display.
        </Alert>
      );
    }

    return (
      <Table size="md" variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th textAlign="left">{"NAME"} </Th>
            <Th textAlign="left">{"ADDRESS"} </Th>
            <Th textAlign="left">{"SHIPPING"} </Th>
            <Th textAlign="left">{"DISCOUNT"} </Th>
            <Th textAlign="left">{"ADDED"} </Th>
            <Th>{""}</Th>
          </Tr>
        </Thead>

        <Tbody>
          {orderPage?.orders.map((order, index) => (
            <Tr key={index} fontWeight={600}>
              <TableCell paddingY={3} paddingX={6}>
                <Link onClick={() => onOrderClick(order)}>
                  {`${order.firstName} ${order.lastName}`}
                </Link>
              </TableCell>
              <TableCell paddingY={3} paddingX={6}>
                {order.address}
              </TableCell>
              <TableCell paddingY={3} paddingX={6}>
                {order.shippingOption}
              </TableCell>
              <TableCell paddingY={3} paddingX={6}>
                {order.discount.Valid && order.discount.String}
              </TableCell>
              <TableCell paddingY={3} paddingX={6}>
                {DateTime.fromISO(order.added).toLocaleString(
                  DateTime.DATE_MED
                )}
              </TableCell>
              <TableCell paddingY={3} paddingX={6}>
                {getAction(order.statusId, order.id)}
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
        <Heading fontSize="24px">{"Orders"}</Heading>
      </Flex>

      <Divider borderWidth={1} marginBottom={4} />

      <Box overflow="auto" margin={6}>
        {isLoading ? <AdminOrdersTablePlaceholder /> : getTable()}
        <Flex marginTop="auto" py={4}>
          <Select
            backgroundColor="#F3F3F3"
            border="none"
            fontWeight="bold"
            onChange={(e) => onStatusChange(parseInt(e.target.value))}
            width="200px"
            height="48px"
            _hover={{ backgroundColor: "#e6e6e6" }}
            isDisabled={isLoading}
            value={statusId}
          >
            <option value={OrderStatuses.PENDING}>{"Pending"}</option>
            <option value={OrderStatuses.PAYMENT_RECEIVED}>
              {"Payment Received"}
            </option>
            <option value={OrderStatuses.SHIPPED}>{"Sent"}</option>
          </Select>

          <Box marginLeft="auto">
            <Button
              backgroundColor="#F3F3F3"
              isDisabled={page === 0 || isLoading}
              marginRight={{ base: 2, sm: 3 }}
              onClick={onPreviousPage}
              height="48px"
              width={{ base: "46px", md: "132px" }}
              _hover={{ backgroundColor: "#e6e6e6" }}
            >
              <ArrowLeft
                marginRight={{ base: 0, md: "6px" }}
                height="20px"
                width="20px"
              />
              {shouldRenderOnMobile && "Previous"}
            </Button>

            <Button
              role="group"
              backgroundColor="#F3F3F3"
              onClick={onNextPage}
              isDisabled={isLoading || !orderPage.hasMore}
              height="48px"
              width={{ base: "46px", md: "132px" }}
              _hover={{ backgroundColor: "#e6e6e6" }}
            >
              {shouldRenderOnMobile && "Next"}
              <ArrowRight
                marginLeft={{ base: 0, md: "6px" }}
                height="20px"
                width="20px"
              />
            </Button>
          </Box>
        </Flex>
      </Box>
    </Card>
  );
};

export default AdminOrdersTable;
