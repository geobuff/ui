import React, { FC } from "react";
import Link from "next/link";
import { Flex, Tag, Link as ChakraLink, FlexProps } from "@chakra-ui/react";
import Twemoji, { Props as TwemojiProps } from "../Twemoji";

export interface Props extends FlexProps {
  itemCount?: number;
  twemojiProps?: TwemojiProps;
}

const ShoppingCartLink: FC<Props> = ({
  itemCount = 0,
  twemojiProps,
  ...props
}) => (
  <Flex
    direction="column"
    justifyContent="center"
    position="relative"
    {...props}
  >
    <Link href="/shopping-cart">
      <ChakraLink>
        <Twemoji emoji="🛒" {...twemojiProps} />
      </ChakraLink>
    </Link>
    {itemCount > 0 && (
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
        {itemCount}
      </Tag>
    )}
  </Flex>
);

export default ShoppingCartLink;
