import React, { FC } from "react";
import { Alert, AlertIcon, Flex } from "@chakra-ui/react";
import { Order } from "../../types/order";
import Card from "../Card";
import OrderTile from "../OrderTile";

export interface Props {
  orders?: Order[];
  isError?: boolean;
}

const MyOrders: FC<Props> = ({ orders = [], isError = false }) => {
  const getContent = () => {
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
          <Card my={6} key={i}>
            <OrderTile order={order} />
          </Card>
        ))}
      </>
    );
  };

  return (
    <Flex
      direction="column"
      maxWidth={{ base: "100%", md: 800 }}
      width="100%"
      marginX="auto"
      marginBottom={14}
      marginTop={10}
      paddingX={3}
    >
      {getContent()}
    </Flex>
  );
};

export default MyOrders;
