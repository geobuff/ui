import React, { FC } from "react";
import Link from "next/link";
import { Flex, Tag, Link as ChakraLink } from "@chakra-ui/react";
import Twemoji from "../Twemoji";

export interface Props {
  cartLength?: number;
}

const ShoppingCartLink: FC<Props> = ({ cartLength = 0 }) => (
  <Flex direction="column" justifyContent="center" mr={6} position="relative">
    <Link href="/shopping-cart">
      <ChakraLink>
        <Twemoji emoji="🛒" />
      </ChakraLink>
    </Link>
    {cartLength > 0 && (
      <Tag
        size="sm"
        colorScheme="red"
        position="absolute"
        bottom="2"
        right="-2"
        minW="0.75rem"
        minH="0.75rem"
        px="0.25rem"
        fontSize="0.5rem"
      >
        {cartLength}
      </Tag>
    )}
  </Flex>
);

export default ShoppingCartLink;
