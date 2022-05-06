import React, { FC } from "react";
import { Flex, Text, Tag, BoxProps, VStack, Box } from "@chakra-ui/react";
import { OrderItem } from "../../../types/order";
import Image from "../../Image";

export interface Props extends BoxProps {
  item?: OrderItem;
}

const OrderTileItem: FC<Props> = ({ item = null, ...props }) => (
  <Flex justifyContent="center" {...props}>
    <VStack>
      <Box position="relative">
        <Tag position="absolute" top={-2} right={-2}>
          {item.quantity}
        </Tag>
        <Flex justifyContent="center">
          <Image
            src={item.imageUrl}
            borderRadius={6}
            height="100px"
            width="auto"
          />
        </Flex>
        <Text textAlign="center">{item.sizeName}</Text>
      </Box>
    </VStack>
  </Flex>
);

export default OrderTileItem;
