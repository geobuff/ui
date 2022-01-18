import React, { FC } from "react";
import { Flex, Link as ChakraLink, Text } from "@chakra-ui/react";

import Link from "next/link";
import Twemoji from "../../Twemoji";

export interface Props {
  href: string;
  label: string;
  emoji?: string;
  isActive?: boolean;
}

const NavigationSidebarQuicklink: FC<Props> = ({
  href,
  emoji,
  label,
  isActive,
}) => {
  return (
    <Link href={href}>
      <ChakraLink
        fontSize="20px"
        fontWeight={isActive ? "bold" : 500}
        textDecoration={isActive && "underline"}
        _hover={
          isActive ? { color: "gray.600" } : { textDecoration: "underline" }
        }
      >
        <Flex alignItems="center">
          {emoji && <Twemoji height="22px" width="22px" emoji={emoji} />}
          <Text ml={2}>{label}</Text>
        </Flex>
      </ChakraLink>
    </Link>
  );
};

export default NavigationSidebarQuicklink;
