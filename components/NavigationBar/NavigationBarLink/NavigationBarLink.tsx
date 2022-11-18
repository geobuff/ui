import React, { FC } from "react";

import { Flex, FlexProps, Link } from "@chakra-ui/react";

export interface Props extends FlexProps {
  href: string;
  isActive?: boolean;
  label: string;
}

const activeLinkStyles = {
  textDecoration: "underline",
  color: "gray.700",
  fontWeight: "bold",
  _hover: {
    color: "gray.600",
  },
};

// These need to be separate to the styles above as Chakra doesn't support
const textDecorationStyles = {
  textDecorationThickness: "2px",
  textUnderlineOffset: "0.5px",
};

const NavigationBarLink: FC<Props> = ({
  href,
  isActive = false,
  label,
  ...props
}) => {
  return (
    <Flex as="nav" {...props}>
      <Link
        href={href}
        fontSize="16px"
        fontWeight={600}
        color="gray.600"
        {...(isActive ? activeLinkStyles : {})}
        style={{
          ...(isActive ? textDecorationStyles : {}),
        }}
      >
        {label}
      </Link>
    </Flex>
  );
};

export default NavigationBarLink;
