import React, { FC } from "react";
import { Text, Tag, Flex, SimpleGrid } from "@chakra-ui/react";
import { Order } from "../../types/order";
import OrderTileItem from "./OrderTileItem";

interface Props {
  order?: Order;
}

const OrderTile: FC<Props> = ({ order = null }) => (
  <Flex direction={{ base: "column", md: "row" }}>
    <SimpleGrid minWidth={{ base: "100%", md: "50%" }}>
      <Flex justifyContent="center">
        {order?.items.map((item, i) => (
          <OrderTileItem key={i} item={item} />
        ))}
      </Flex>
    </SimpleGrid>
    <Flex direction="column" minWidth={{ base: "100%", md: "50%" }}>
      <Text>{`Name: ${order.firstName} ${order.lastName}`}</Text>
      <Text>{`Address: ${order.address}`}</Text>
      <Text>{`Suburb: ${order.suburb}`}</Text>
      <Text>{`City: ${order.city}`}</Text>
      <Text>{`Postcode: ${order.postcode}`}</Text>
      <Text>{`Purchased: ${order.added}`}</Text>
      {order.discount.Valid && (
        <Text>{`Discount code: ${order.discount.String}`}</Text>
      )}
      <Text>
        Status: <Tag>{order.status}</Tag>
      </Text>
    </Flex>
  </Flex>
);

export default OrderTile;
