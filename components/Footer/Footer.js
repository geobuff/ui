import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

import { Flex, Text, Link as ChakraLink } from "@chakra-ui/react";

const links = [
  {
    href: "/our-mission",
    text: "Our Mission",
  },
  {
    href: "/merch",
    text: "Merch",
  },
  {
    href: "/privacy-policy",
    text: "Privacy Policy",
  },
  {
    href: "/terms-of-service",
    text: "Terms of Service",
  },
  {
    href: "/cookie-policy",
    text: "Cookie Policy",
  },
];

const simpleFooter = (
  <Flex
    as="footer"
    direction="column"
    justifyContent="center"
    marginTop="auto"
    paddingY={6}
  >
    <Flex alignSelf="center">
      <Text color="gray.500" fontSize={{ base: "11px", md: "14px" }}>
        {"© 2021 GeoBuff. All rights reserved."}
      </Text>
    </Flex>
  </Flex>
);

const extendedFooter = (
  <Flex
    as="footer"
    borderTop="2px solid #E3E1E1"
    direction="column"
    justifyContent="center"
    marginTop="auto"
  >
    <Flex
      paddingY={5}
      paddingX={{ base: 3, md: 8 }}
      justifyContent="space-between"
    >
      <Flex direction={{ base: "column", md: "row" }}>
        {links.map(({ href, text }) => (
          <Link key={href} href={href}>
            <ChakraLink
              color="gray.600"
              fontSize={{ base: "11px", md: "14px" }}
              fontWeight="bold"
              marginLeft={4}
              marginY={{ base: 1, md: 0 }}
            >
              {text}
            </ChakraLink>
          </Link>
        ))}
      </Flex>

      <Flex
        justifyContent="flex-end"
        alignItems={{ base: "flex-end", md: "center" }}
      >
        <Text color="gray.500" fontSize={{ base: "11px", md: "14px" }}>
          {"© 2021 GeoBuff. All rights reserved."}
        </Text>
      </Flex>
    </Flex>
  </Flex>
);

const Footer = ({ variant }) => {
  switch (variant) {
    case "simple":
      return simpleFooter;
    default:
      return extendedFooter;
  }
};

Footer.propTypes = {
  variant: PropTypes.oneOf(["simple", "extended"]),
};
Footer.defaultProps = {
  variant: "extended",
};

export default Footer;
