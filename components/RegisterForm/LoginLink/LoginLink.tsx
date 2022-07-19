import React, { FC } from "react";
import { Flex, Text, Link } from "@chakra-ui/react";

const LoginLink: FC = () => {
  return (
    <Flex
      direction="row"
      marginTop={{ base: 3, md: 5 }}
      marginRight={{ base: 0, md: 5 }}
    >
      <Text fontSize="14px" marginRight={1} fontWeight="500">
        {"Already signed up?"}
      </Text>
      <Link
        href="/login"
        fontSize="14px"
        fontWeight="500"
        textDecoration="underline"
        _hover={{ color: "#5c5c5c" }}
      >
        {"Login to your account"}
      </Link>
    </Flex>
  );
};

export default LoginLink;
