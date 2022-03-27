import React, { FC } from "react";
import { DateTime } from "luxon";
import { Text, Tag, Flex, SimpleGrid } from "@chakra-ui/react";
import { Order } from "../../types/order";
import OrderTileItem from "./OrderTileItem";

interface Props {
  order?: Order;
}

const OrderTile: FC<Props> = ({ order = null }) => (
  <Flex direction={{ base: "column", md: "row" }}>
    <SimpleGrid minWidth={{ base: "100%", md: "50%" }} columns={3} spacingY={6}>
      {order?.items.map((item, i) => (
        <OrderTileItem key={i} item={item} />
      ))}
    </SimpleGrid>
    <Flex
      width="100%"
      justifyContent="center"
      mt={{ base: 12, md: 0 }}
      mb={{ base: 6, md: 0 }}
    >
      <Flex direction="column" minWidth={{ base: 0, md: "50%" }}>
        <Text mb={1}>
          {order.firstName} {order.lastName}
        </Text>
        <Text mb={1}>{order.address}</Text>
        <Text mb={1}>
          {DateTime.fromISO(order.added).toLocaleString(DateTime.DATE_MED)}
        </Text>
        {order.discount.Valid && <Text mb={1}>{order.discount.String}</Text>}
        <Text mt={1}>
          <Tag>{order.status}</Tag>
        </Text>
      </Flex>
    </Flex>
  </Flex>
);

export default OrderTile;
