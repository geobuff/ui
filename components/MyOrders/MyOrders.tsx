import React, { FC } from "react";
import { Alert, AlertIcon, Box, Flex } from "@chakra-ui/react";
import { Order } from "../../types/order";
import Card from "../Card";
import OrderItem from "../OrderTile";

export interface Props {
  orders?: Order[];
}

const MyOrders: FC<Props> = ({ orders = [] }) => (
  <Flex
    direction="column"
    maxWidth={{ base: "100%", md: 1300 }}
    marginX="auto"
    marginBottom={14}
    marginTop={{ base: 10, sm: 10, md: 14 }}
    paddingX={3}
    width="100%"
  >
    <Card>
      {orders.length === 0 ? (
        <Alert status="info" borderRadius={6}>
          <AlertIcon />
          No orders to display.
        </Alert>
      ) : (
        <>
          {orders.map((order, i) => (
            <Box my={6} key={i}>
              <OrderItem order={order} />
            </Box>
          ))}
        </>
      )}
    </Card>
  </Flex>
);

export default MyOrders;
