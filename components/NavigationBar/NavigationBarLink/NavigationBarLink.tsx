import React, { FC } from "react";
import { Flex, Link as ChakraLink } from "@chakra-ui/react";
import Link from "next/link";

export interface Props {
  href: string;
  isActive?: boolean;
}

const activeLinkStyles = {
  textDecoration: "underline",
  color: "gray.700",
  fontWeight: "bold",
};

// These need to be separate to the styles above as Chakra doesn't support
const textDecorationStyles = {
  textDecorationThickness: "2px",
  textUnderlineOffset: "1px",
};

const NavigationBarLink: FC<Props> = ({
  href,
  isActive = false,
  children,
  ...props
}) => {
  return (
    <Flex marginLeft={6} marginTop="2px" as="nav" {...props}>
      <Link href={href}>
        <ChakraLink
          fontSize="16px"
          fontWeight={600}
          color="gray.600"
          {...(isActive ? activeLinkStyles : {})}
          style={{
            ...(isActive ? textDecorationStyles : {}),
          }}
        >
          {children}
        </ChakraLink>
      </Link>
    </Flex>
  );
};

export default NavigationBarLink;
