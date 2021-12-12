import React, { FC } from "react";
import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

export interface Props {
  discount?: number;
  shippingPrice?: number;
  onGetTotal?: () => number;
}

const PriceSummary: FC<Props> = ({
  discount = 0,
  shippingPrice = 5,
  onGetTotal = (): number => 0,
}) => {
  const router = useRouter();

  return (
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
            <Text>{`$${onGetTotal() + shippingPrice - discount}`}</Text>
          </Flex>
        </Stack>
        <Button colorScheme="teal" onClick={() => router.push("/checkout")}>
          Proceed To Checkout
        </Button>
      </Flex>
    </Flex>
  );
};

export default PriceSummary;
