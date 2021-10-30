import React, { useEffect, useState, FC, useContext } from "react";
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
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

import Link from "next/link";

import { Squash as Hamburger } from "hamburger-react";

import Logo from "../Logo";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { AppContext } from "../../context/AppContext";
import { useSwipeable } from "react-swipeable";

const UserAvatarMenuNoSSR = dynamic(() => import("../UserAvatarMenu"), {
  ssr: false,
});

const createAccountExplainer =
  "Don't have an account? Sign up today to earn XP, unlock badges and compete with friends!";

const popularQuizzes = [
  {
    href: "/quiz/countries-of-the-world",
    label: "Countries of the World",
  },
  {
    href: "/quiz/capitals-of-the-world",
    label: "Capitals of the World",
  },
  {
    href: "/quiz/flags-of-the-world",
    label: "Flags of the World",
  },
  {
    href: "/quiz/us-states",
    label: "US States",
  },
];

const desktopLayout = (
  <Flex alignItems="center" justifyContent="space-between" minHeight="56px">
    <Flex alignItems="center">
      <Link href="/">
        <ChakraLink _hover={{ textDecoration: "none" }}>
          <Logo />
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

const NavigationBar: FC = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { user } = useContext(CurrentUserContext);

  const [zIndex, setZIndex] = useState(5);

  const { isNavSidebarOpen, setIsNavSidebarOpen, isAppMobile } = useContext(
    AppContext
  );

  useEffect(() => {
    if (isNavSidebarOpen) {
      setZIndex(9999);
    } else {
      setTimeout(() => {
        setZIndex(5);
      }, 200);
    }
  }, [isNavSidebarOpen]);

  const getViewLayout = (): React.ReactNode => {
    if (isMobile === undefined) {
      return null;
    }
    return isMobile ? mobileLayout : desktopLayout;
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => isAppMobile && setIsNavSidebarOpen(false),
    trackTouch: true,
    trackMouse: false,
    rotationAngle: 0,
  });

  const mobileLayout = (
    <Flex alignItems="center" justifyContent="space-between" minHeight="56px">
      <Flex alignItems="center">
        <Hamburger
          size={24}
          toggled={isNavSidebarOpen}
          toggle={setIsNavSidebarOpen}
        />
      </Flex>
      <Link href="/">
        <ChakraLink _hover={{ textDecoration: "none" }}>
          <Logo />
        </ChakraLink>
      </Link>

      <Box minWidth="60px">
        <UserAvatarMenuNoSSR isCondensed />
      </Box>
    </Flex>
  );

  return (
    <>
      <Box
        m={0}
        px={{ base: 3, md: 5 }}
        backgroundColor="white"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.08)"
        position="fixed"
        top={0}
        left={0}
        right={0}
        width="100%"
        zIndex={zIndex}
        minHeight="56px"
      >
        {getViewLayout()}
      </Box>
      {isMobile && (
        <Drawer
          placement={"left"}
          onClose={(): void => setIsNavSidebarOpen(false)}
          isOpen={isNavSidebarOpen}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerBody marginTop="72px" {...handlers}>
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
                      <ChakraLink fontSize="20px" fontWeight={600}>
                        {"Home"}
                      </ChakraLink>
                    </Link>

                    <Divider borderColor="#E3E1E1" borderWidth={1} my={2} />

                    <Link href="/leaderboard">
                      <ChakraLink fontSize="20px" fontWeight={600}>
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
                      fontSize="16px"
                      fontWeight="bold"
                      marginTop={8}
                      marginBottom={3}
                    >
                      {"POPULAR QUIZZES"}
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

                {!user && (
                  <Flex width="100%" direction="column" marginTop={10}>
                    <Divider borderColor="#E3E1E1" borderWidth={1} my={2} />
                    <Text
                      marginY={4}
                      textAlign="center"
                      fontSize="12px"
                      color="gray.600"
                      fontWeight={600}
                    >
                      {createAccountExplainer}
                    </Text>
                    <Link href="/register">
                      <Button
                        colorScheme="green"
                        size="lg"
                        width="100%"
                        height="60px"
                        fontWeight="bold"
                      >
                        {"Create An Account"}
                      </Button>
                    </Link>
                  </Flex>
                )}
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default NavigationBar;
