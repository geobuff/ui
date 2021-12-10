import React, { FC } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { OrderItem } from "../../../types/order";
import Image from "../../Image";

export interface Props {
  item?: OrderItem;
}

const OrderTileItem: FC<Props> = ({ item = null }) => (
  <Flex direction="column" justifyContent="center">
    <Image src={item.imageUrl} />
    <Text>{`${item.itemName} - ${item.sizeName}`}</Text>
    <Text>{`Quantity: ${item.quantity}`}</Text>
  </Flex>
);

export default OrderTileItem;
