import React, { useEffect, useState, FC, useContext } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Squash as Hamburger } from "hamburger-react";

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
  Skeleton,
} from "@chakra-ui/react";

import Logo from "../Logo";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { AppContext } from "../../context/AppContext";
import { useSwipeable } from "react-swipeable";
import { ShoppingCartContext } from "../../context/ShoppingCartContext";
import ShoppingCartLink from "../ShoppingCartLink";
import { useRouter } from "next/router";
import NavigationBarLink from "./NavigationBarLink";
import Twemoji from "../Twemoji";

const isAppMobile = process.env.NEXT_PUBLIC_APP_MODE === "mobile";

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

const NavigationBar: FC = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { user } = useContext(CurrentUserContext);
  const { route } = useRouter();

  const [zIndex, setZIndex] = useState(5);

  const { isNavSidebarOpen: isOpen, setIsNavSidebarOpen } = useContext(
    AppContext
  );

  const { cart, isLoading: isCartLoading, getItemCount } = useContext(
    ShoppingCartContext
  );

  useEffect(() => {
    if (isOpen) {
      setZIndex(9999);
    } else {
      setTimeout(() => {
        setZIndex(5);
      }, 200);
    }
  }, [isOpen]);

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

  const desktopLayout = (
    <Flex alignItems="center" justifyContent="space-between" minHeight="56px">
      <Flex alignItems="center">
        <Link href="/">
          <ChakraLink _hover={{ textDecoration: "none" }}>
            <Logo />
          </ChakraLink>
        </Link>

        <NavigationBarLink
          href="/leaderboard"
          isActive={route === "/leaderboard"}
        >
          {"Leaderboard"}
        </NavigationBarLink>

        <NavigationBarLink
          href="/daily-trivia"
          isActive={route === "/daily-trivia"}
        >
          {"Daily Trivia"}
        </NavigationBarLink>
      </Flex>

      <Flex>
        {isCartLoading ? (
          <Flex direction="column" justifyContent="center" mr={6}>
            <Skeleton width="30px" height="30px" />
          </Flex>
        ) : (
          <>
            {cart?.length > 0 && (
              <ShoppingCartLink itemCount={getItemCount()} />
            )}
          </>
        )}
        <UserAvatarMenuNoSSR />
      </Flex>
    </Flex>
  );

  const mobileLayout = (
    <Flex alignItems="center" justifyContent="space-between" minHeight="56px">
      <Flex alignItems="center">
        <Hamburger size={24} toggled={isOpen} toggle={setIsNavSidebarOpen} />
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
          placement="left"
          onClose={(): void => setIsNavSidebarOpen(false)}
          isOpen={isOpen}
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
                        <Flex alignItems="center">
                          <Twemoji height="22px" width="22px" emoji="🏡" />
                          <Text ml={2}>{"Home"}</Text>
                        </Flex>
                      </ChakraLink>
                    </Link>

                    <Divider borderColor="#E3E1E1" borderWidth={1} my={2} />

                    <Link href="/leaderboard">
                      <ChakraLink fontSize="20px" fontWeight={600}>
                        <Flex alignItems="center">
                          <Twemoji height="22px" width="22px" emoji="🏆" />
                          <Text ml={2}>{"Leaderboard"}</Text>
                        </Flex>
                      </ChakraLink>
                    </Link>

                    <Divider borderColor="#E3E1E1" borderWidth={1} my={2} />

                    <Link href="/daily-trivia">
                      <ChakraLink fontSize="20px" fontWeight={600}>
                        <Flex alignItems="center">
                          <Twemoji height="22px" width="22px" emoji="❓" />
                          <Text ml={2}>{"Daily Trivia"}</Text>
                        </Flex>
                      </ChakraLink>
                    </Link>

                    <Divider borderColor="#E3E1E1" borderWidth={1} my={2} />

                    <Link href="/map-games">
                      <ChakraLink fontSize="20px" fontWeight={600}>
                        <Flex alignItems="center">
                          <Twemoji height="22px" width="22px" emoji="🗺" />
                          <Text ml={2}>{"Map Games"}</Text>
                        </Flex>
                      </ChakraLink>
                    </Link>

                    <Divider borderColor="#E3E1E1" borderWidth={1} my={2} />

                    <Link href="/flag-games">
                      <ChakraLink fontSize="20px" fontWeight={600}>
                        <Flex alignItems="center">
                          <Twemoji height="22px" width="22px" emoji="🎌" />
                          <Text ml={2}>{"Flag Games"}</Text>
                        </Flex>
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
                  <Flex width="100%" direction="column" marginY={2}>
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
