import React, { FC } from "react";
import { Button, Flex, Heading, Input, Skeleton, Text } from "@chakra-ui/react";

import Image from "../../components/Image";

export interface Props {
  noOfItems?: number;
}

const ShoppingCartPlaceholder: FC<Props> = ({ noOfItems = 2 }) => (
  <Flex background="white" width="100%" justifyContent="center" padding={12}>
    <Flex direction="column">
      {[...Array(noOfItems)].map((_, i) => (
        <Skeleton key={i} mb={12}>
          <Flex justifyContent="center">
            <Flex direction="column" justifyContent="center" mr={6}>
              <Image width="150px" height="150px" borderRadius="12px" />
            </Flex>
            <Flex direction="column">
              <Heading>Name</Heading>
              <Text mt={1}>Size</Text>
              <Text mt={1}>Price</Text>
              <Flex mt={3}>
                <Input maxWidth="75px" mr={6} />
                <Button>Remove</Button>
              </Flex>
            </Flex>
          </Flex>
        </Skeleton>
      ))}
      <Skeleton>
        <Button>Checkout</Button>
      </Skeleton>
    </Flex>
  </Flex>
);

export default ShoppingCartPlaceholder;
