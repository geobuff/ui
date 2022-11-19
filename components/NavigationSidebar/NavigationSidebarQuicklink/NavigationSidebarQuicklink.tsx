import React, { FC, isValidElement } from "react";

import { Flex, Link, Text } from "@chakra-ui/react";

import Twemoji from "../../Twemoji";

export interface Props {
  href: string;
  label: string;
  emoji?: string;
  node?: React.ReactNode;
  isActive?: boolean;
}

const NavigationSidebarQuicklink: FC<Props> = ({
  href,
  emoji,
  node,
  label,
  isActive,
}) => {
  return (
    <Link
      href={href}
      fontSize="20px"
      fontWeight={isActive ? "bold" : 500}
      textDecoration={isActive && "underline"}
      _hover={
        isActive ? { color: "gray.600" } : { textDecoration: "underline" }
      }
    >
      <Flex alignItems="center">
        {isValidElement(node) ? (
          node
        ) : (
          <>{emoji && <Twemoji height="22px" width="22px" emoji={emoji} />}</>
        )}
        <Text ml={3}>{label}</Text>
      </Flex>
    </Link>
  );
};

export default NavigationSidebarQuicklink;
