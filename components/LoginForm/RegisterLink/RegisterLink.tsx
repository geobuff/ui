import React, { FC } from "react";

import Link from "next/link";
import { Flex, Link as ChakraLink, Text } from "@chakra-ui/react";

const RegisterLink: FC = () => (
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
);

export default RegisterLink;
