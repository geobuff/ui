import React, { FC } from "react";
import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { formatNumber } from "../../../helpers/number";

export interface Props {
  discount?: number;
  onGetTotal?: () => number;
}

const PriceSummary: FC<Props> = ({
  discount = 0,
  onGetTotal = (): number => 0,
}) => {
  const router = useRouter();

  const rawTotal = onGetTotal() - discount;
  const formattedTotal = formatNumber(rawTotal);

  return (
    <Flex
      justifyContent={{ base: "center", md: "flex-end" }}
      paddingX={{ base: 3, md: 0 }}
      mt={12}
    >
      <Flex direction="column" width={{ base: "100%", md: "25%" }}>
        <Stack mb={12}>
          <Flex justifyContent="space-between">
            <Text>{"Subtotal:"}</Text>
            <Text>{`$${onGetTotal()}`}</Text>
          </Flex>
          {discount > 0 && (
            <Flex justifyContent="space-between">
              <Text>{"Discount:"}</Text>
              <Text>{`-$${discount}`}</Text>
            </Flex>
          )}
          <Flex justifyContent="space-between" fontWeight="bold">
            <Text>{"Total:"}</Text>
            <Text>{`$${formattedTotal}`}</Text>
          </Flex>
        </Stack>
        <Button colorScheme="teal" onClick={() => router.push("/checkout")}>
          {"Proceed To Checkout"}
        </Button>
      </Flex>
    </Flex>
  );
};

export default PriceSummary;
