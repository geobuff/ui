import React, { FC } from "react";
import { Button, Flex, Stack, Text } from "@chakra-ui/react";

export interface Props {
  discount?: number;
  shippingPrice?: number;
  onGetTotal?: () => number;
}

const PriceSummary: FC<Props> = ({
  discount = 0,
  shippingPrice = 5,
  onGetTotal = (): number => 0,
}) => (
  <Flex
    justifyContent={{ base: "center", md: "flex-end" }}
    paddingX={6}
    mt={12}
  >
    <Flex direction="column" width={{ base: "100%", md: "25%" }}>
      <Stack mb={12}>
        <Flex justifyContent="space-between">
          <Text>Subtotal:</Text>
          <Text>{`$${onGetTotal()}`}</Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text>Shipping:</Text>
          <Text>{`$${shippingPrice}`}</Text>
        </Flex>
        {discount > 0 && (
          <Flex justifyContent="space-between">
            <Text>Discount:</Text>
            <Text>{`-$${discount}`}</Text>
          </Flex>
        )}
        <Flex justifyContent="space-between" fontWeight="bold">
          <Text>Total:</Text>
          <Text>{`$${
            Math.round((onGetTotal() + shippingPrice - discount) * 100) / 100
          }`}</Text>
        </Flex>
      </Stack>
      <Button colorScheme="teal">Proceed To Checkout</Button>
    </Flex>
  </Flex>
);

export default PriceSummary;