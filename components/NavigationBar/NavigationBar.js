import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Box, Flex, Link as ChakraLink, Image } from "@chakra-ui/react";

const UserAvatarMenuNoSSR = dynamic(() => import("../UserAvatarMenu"), {
  ssr: false,
});

const NavigationBar = () => {
  return (
    <Box
      m={0}
      py={2}
      px={{ base: 3, md: 5 }}
      backgroundColor="white"
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.08)"
      position="relative"
      top={0}
      left={0}
      width="100%"
      zIndex={1}
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <Link href="/">
            <ChakraLink _hover={{ textDecoration: "none" }}>
              <Image src="/logo.svg" height="40px" />
            </ChakraLink>
          </Link>
        </Flex>
        <UserAvatarMenuNoSSR />
      </Flex>
    </Box>
  );
};

export default NavigationBar;
