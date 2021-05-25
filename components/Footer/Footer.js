import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

import { Flex, Spacer, Text, Link as ChakraLink } from "@chakra-ui/react";

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
    <Flex paddingY={5} paddingX={{ base: 3, md: 8 }}>
      <Link href="/our-mission">
        <ChakraLink marginLeft={4}>
          <Text
            color="gray.600"
            fontSize={{ base: "11px", md: "14px" }}
            fontWeight="bold"
          >
            {"Our Mission"}
          </Text>
        </ChakraLink>
      </Link>
      <Link href="/terms-of-service">
        <ChakraLink marginLeft={4}>
          <Text
            color="gray.600"
            fontSize={{ base: "11px", md: "14px" }}
            fontWeight="bold"
          >
            {"Terms of Service"}
          </Text>
        </ChakraLink>
      </Link>
      <Spacer />
      <Text color="gray.500" fontSize={{ base: "11px", md: "14px" }}>
        {"© 2021 GeoBuff. All rights reserved."}
      </Text>
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
