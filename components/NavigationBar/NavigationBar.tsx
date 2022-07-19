import React, { useEffect, useState, FC, useContext } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { Box, Flex, Link, useBreakpointValue, Fade } from "@chakra-ui/react";
import { Squash as Hamburger } from "hamburger-react";

import Logo from "../Logo";
import NavigationBarLink from "./NavigationBarLink";
import NavigationSidebar from "../NavigationSidebar";
import ShoppingCartLink from "../ShoppingCartLink";

import { AppContext } from "../../context/AppContext";
import { ShoppingCartContext } from "../../context/ShoppingCartContext";

const UserAvatarMenuNoSSR = dynamic(() => import("../UserAvatarMenu"), {
  ssr: false,
});

const NavigationBar: FC = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { route } = useRouter();

  const [zIndex, setZIndex] = useState(5);

  const { isNavSidebarOpen: isOpen, setIsNavSidebarOpen } =
    useContext(AppContext);

  const { cart, getItemCount } = useContext(ShoppingCartContext);

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

  const desktopLayout = (
    <Flex alignItems="center" justifyContent="space-between" minHeight="56px">
      <Flex alignItems="center">
        <Link href="/" _hover={{ textDecoration: "none" }}>
          <Logo />
        </Link>

        <NavigationBarLink
          href="/leaderboard"
          label="Leaderboard"
          isActive={route === "/leaderboard"}
          marginLeft={6}
        />

        <NavigationBarLink
          href="/daily-trivia"
          label="Trivia"
          isActive={route === "/daily-trivia"}
          marginLeft={6}
        />

        <NavigationBarLink
          href="/community-quiz"
          label="Community"
          isActive={route === "/community-quiz"}
          marginLeft={6}
        />

        <NavigationBarLink
          href="/map-games"
          label="Map"
          isActive={route === "/map-games"}
          marginLeft={6}
        />

        <NavigationBarLink
          href="/flag-games"
          label="Flag"
          isActive={route === "/flag-games"}
          marginLeft={6}
        />

        <NavigationBarLink
          href="/merch"
          label="Merch"
          isActive={route === "/merch"}
          marginLeft={6}
        />
      </Flex>

      <Flex alignItems="center">
        {cart?.length > 0 && (
          <Fade in>
            <ShoppingCartLink itemCount={getItemCount()} marginRight={6} />
          </Fade>
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
      <Link href="/" _hover={{ textDecoration: "none" }}>
        <Logo />
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
        <NavigationSidebar
          onClose={() => setIsNavSidebarOpen(false)}
          isOpen={isOpen}
          shoppingCartItemCount={getItemCount()}
        />
      )}
    </>
  );
};

export default NavigationBar;
