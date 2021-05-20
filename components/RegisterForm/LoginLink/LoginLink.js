import React from "react";

import { Flex, Text, Link as ChakraLink } from "@chakra-ui/react";
import Link from "next/link";

const LoginLink = () => {
  return (
    <Flex direction="row" margin={{ sm: 3, md: 5 }}>
      <Text fontSize="14px" marginRight={1} fontWeight="500">
        {"Already signed up?"}
      </Text>
      <Link href="/login">
        <ChakraLink
          fontSize="14px"
          fontWeight="500"
          textDecoration="underline"
          _hover={{ color: "#5c5c5c" }}
        >
          {"Login to your account"}
        </ChakraLink>
      </Link>
    </Flex>
  );
};

export default LoginLink;
