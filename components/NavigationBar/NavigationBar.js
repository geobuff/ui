import React, { useState } from "react";
import dynamic from "next/dynamic";

import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  Flex,
  Link as ChakraLink,
  Image,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

import Link from "next/link";

import { Squash as Hamburger } from "hamburger-react";

const UserAvatarMenuNoSSR = dynamic(() => import("../UserAvatarMenu"), {
  ssr: false,
});

const popularQuizzes = [
  {
    href: "/quiz/countries-of-the-world",
    label: "Countries of the World",
  },
  {
    href: "/quiz/countries-of-europe",
    label: "Countries of Europe",
  },
  {
    href: "/quiz/us-states",
    label: "US States",
  },
];

const desktopLayout = (
  <Flex alignItems="center" justifyContent="space-between">
    <Flex alignItems="center">
      <Link href="/">
        <ChakraLink _hover={{ textDecoration: "none" }}>
          <Image src="/logo.svg" height="36px" />
        </ChakraLink>
      </Link>

      <Flex marginLeft={6} marginTop="2px" as="nav">
        <Link href="/leaderboard">
          <ChakraLink fontSize="16px" fontWeight={600} color="gray.600">
            {"Leaderboard"}
          </ChakraLink>
        </Link>
      </Flex>
    </Flex>
    <UserAvatarMenuNoSSR />
  </Flex>
);

const NavigationBar = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  const [isOpen, setOpen] = useState(false);

  const mobileLayout = (
    <Flex alignItems="center" justifyContent="space-between">
      <Flex alignItems="center">
        <Hamburger size={24} toggled={isOpen} toggle={setOpen} />
      </Flex>
      <Link href="/">
        <ChakraLink _hover={{ textDecoration: "none" }}>
          <Image src="/logo.svg" height="36px" />
        </ChakraLink>
      </Link>
      <UserAvatarMenuNoSSR isCondensed />
    </Flex>
  );

  return (
    <>
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
        zIndex={9999}
        minHeight="56px"
      >
        {isMobile && isMobile ? mobileLayout : desktopLayout}
      </Box>

      {isMobile && (
        <Drawer
          size="full"
          placement={"top"}
          onClose={() => setOpen(false)}
          isOpen={isOpen}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerBody marginTop="72px">
              <Flex
                as="nav"
                direction="column"
                height="100%"
                justifyContent="space-between"
                paddingY={4}
              >
                <Flex direction="column" justifyContent="space-between">
                  <Box>
                    <Link href="/">
                      <ChakraLink
                        fontSize="20px"
                        fontWeight={600}
                        color="gray.700"
                      >
                        {"Home"}
                      </ChakraLink>
                    </Link>

                    <Divider borderColor="#E3E1E1" borderWidth={1} my={2} />

                    <Link href="/leaderboard">
                      <ChakraLink
                        fontSize="20px"
                        fontWeight={600}
                        color="gray.700"
                      >
                        {"Leaderboard"}
                      </ChakraLink>
                    </Link>
                  </Box>

                  <Divider
                    borderColor="#E3E1E1"
                    borderWidth={1}
                    marginTop={2}
                  />

                  <Flex direction="column">
                    <Text
                      fontSize="20px"
                      fontWeight={600}
                      color="gray.600"
                      marginTop={6}
                      marginBottom={4}
                    >
                      {"Popular Quizzes"}
                    </Text>

                    {popularQuizzes.map(({ href, label }) => (
                      <Link key={label} href={href}>
                        <ChakraLink
                          fontSize="16px"
                          fontWeight={600}
                          color="gray.600"
                          marginY={1}
                        >
                          {label}
                        </ChakraLink>
                      </Link>
                    ))}
                  </Flex>
                </Flex>

                <Flex width="100%" direction="column">
                  <Divider borderColor="#E3E1E1" borderWidth={1} my={2} />
                  <Text
                    marginY={4}
                    textAlign="center"
                    fontSize="12px"
                    color="gray.600"
                    fontWeight={600}
                  >
                    {
                      "Don't have an account? Sign up today to earn XP, unlock badges and compete with friends!"
                    }
                  </Text>
                  <Link href="/register">
                    <Button
                      colorScheme="green"
                      size="lg"
                      width="100%"
                      height="60px"
                    >
                      {"Create An Account"}
                    </Button>
                  </Link>
                </Flex>
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default NavigationBar;
