import React, { FC } from "react";
import { DateTime } from "luxon";
import {
  Box,
  Button,
  Flex,
  Select,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from "@chakra-ui/react";
import TableCell from "../TableCell";
import { OrderPageDto } from "../../types/order-page-dto";
import AdminOrdersTablePlaceholder from "../../placeholders/AdminOrdersTablePlaceholder";
import ArrowLeft from "../../Icons/ArrowLeft";
import ArrowRight from "../../Icons/ArrowRight";
import { OrderStatuses } from "../../types/order-statuses";

export interface Props {
  orderPage?: OrderPageDto;
  page?: number;
  statusId?: number;
  isLoading?: boolean;
  isSubmitting?: boolean;
  onProgressToShipped?: (orderId: number) => void;
  onDeleteOrder?: (orderId: number) => void;
  onStatusChange?: (statusId: number) => void;
  onNextPage?: () => void;
  onPreviousPage?: () => void;
}

const AdminOrdersTable: FC<Props> = ({
  orderPage = null,
  page = 0,
  statusId = 0,
  isLoading = false,
  isSubmitting = false,
  onProgressToShipped = (orderId: number): void => {},
  onDeleteOrder = (orderId: number): void => {},
  onStatusChange = (statusId: number): void => {},
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
            onClick={() => onDeleteOrder(orderId)}
          >
            DELETE
          </Button>
        );
      case OrderStatuses.PAYMENT_RECEIVED:
        return (
          <Button
            colorScheme="blue"
            disabled={isSubmitting || isLoading}
            onClick={() => onProgressToShipped(orderId)}
          >
            PROGRESS
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <Flex
      margin={6}
      background="white"
      borderRadius={12}
      justifyContent="center"
    >
      <Box overflow="auto" margin={6}>
        {isLoading ? (
          <AdminOrdersTablePlaceholder />
        ) : (
          <Table size="md" variant="striped" colorscheme="gray">
            <Thead>
              <Tr>
                <Th textAlign="left">{"NAME"} </Th>
                <Th textAlign="left">{"ADDRESS"} </Th>
                <Th textAlign="left">{"ADDED"} </Th>
                <Th>{""}</Th>
              </Tr>
            </Thead>

            <Tbody>
              {orderPage?.orders.map((order, index) => (
                <Tr key={index} fontWeight={600}>
                  <TableCell paddingY={3} paddingX={6}>
                    {`${order.firstName} ${order.lastName}`}
                  </TableCell>
                  <TableCell paddingY={3} paddingX={6}>
                    {`${order.address}, ${order.suburb}, ${order.city}, ${order.postcode}`}
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
        )}
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
    </Flex>
  );
};

export default AdminOrdersTable;
