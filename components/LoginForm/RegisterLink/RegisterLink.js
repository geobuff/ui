import React from "react";

import Link from "next/link";
import { Box, Flex, Link as ChakraLink, Text } from "@chakra-ui/react";

const RegisterLink = () => {
  return (
    <Box position="absolute" top={0} right={0}>
      <Flex direction="row" margin={{ sm: 3, md: 5 }}>
        <Text fontSize="14px" marginRight={1} fontWeight="500">
          {"Don't have an account?"}
        </Text>
        <Link href="/register">
          <ChakraLink
            fontSize="14px"
            fontWeight="500"
            textDecoration="underline"
            _hover={{ color: "#5c5c5c" }}
          >
            {"Sign up today"}
          </ChakraLink>
        </Link>
      </Flex>
    </Box>
  );
};

export default RegisterLink;
