import React, { FC } from "react";
import { Alert, AlertIcon, Box, Flex } from "@chakra-ui/react";
import { Order } from "../../types/order";
import Card from "../Card";
import OrderItem from "../OrderTile";

export interface Props {
  orders?: Order[];
  isError?: boolean;
}

const MyOrders: FC<Props> = ({ orders = [], isError = false }) => {
  const getCardContent = (): React.ReactNode => {
    if (isError) {
      return (
        <Alert status="error" borderRadius={6}>
          <AlertIcon />
          Error fetching orders. Please refresh the page and try again.
        </Alert>
      );
    }

    if (orders.length === 0) {
      return (
        <Alert status="info" borderRadius={6}>
          <AlertIcon />
          No orders to display.
        </Alert>
      );
    }

    return (
      <>
        {orders.map((order, i) => (
          <Box my={6} key={i}>
            <OrderItem order={order} />
          </Box>
        ))}
      </>
    );
  };

  return (
    <Flex
      direction="column"
      maxWidth={{ base: "100%", md: 1300 }}
      marginX="auto"
      marginBottom={14}
      marginTop={{ base: 10, sm: 10, md: 14 }}
      paddingX={3}
      width="100%"
    >
      <Card>{getCardContent()}</Card>
    </Flex>
  );
};

export default MyOrders;
