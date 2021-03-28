import React from "react";
import Link from "next/link";

import { Flex, Spacer, Text, Link as ChakraLink } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex
      borderTop="2px solid #E3E1E1"
      direction="column"
      justifyContent="center"
      marginY={5}
    >
      <Flex paddingY={5} paddingX={8}>
        <Link href="/our-mission">
          <ChakraLink marginLeft={4}>
            <Text ml={2} color="gray.600" fontSize="14px" fontWeight="bold">
              {"Our Mission"}
            </Text>
          </ChakraLink>
        </Link>
        <Spacer />
        <Text color="gray.500">{"© 2021 GeoBuff. All rights reserved."}</Text>
      </Flex>
    </Flex>
  );
};

Footer.propTypes = {};
Footer.defaultProps = {};

export default Footer;
