import React, { FC, useContext } from "react";

import {
  GeoBuffLogo,
  NavigationBar,
  NavigationBarLink,
  NavigationSidebarLink,
} from "@geobuff/buff-ui/components";

import {
  Box,
  Button,
  Divider,
  Fade,
  Flex,
  Link,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { AppContext } from "../contexts/AppContext";
import { LanguageContext } from "../contexts/LanguageContext";
import { ShoppingCartContext } from "../contexts/ShoppingCartContext";

import LanguageSelect from "../components/LanguageSelect/LanguageSelect";
import ShoppingCartLink from "../components/ShoppingCartLink";

import { insert } from "../helpers/array";
import { AuthUser } from "../types/auth-user";

const UserAvatarMenu = dynamic(() => import("../components/UserAvatarMenu"));

export const NavigationBarContainer: FC = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const isLarge = useBreakpointValue({ base: false, lg: true });

  const { t } = useContext(LanguageContext);
  const { cart, getItemCount } = useContext(ShoppingCartContext);
  const { isNavSidebarOpen, setIsNavSidebarOpen } = useContext(AppContext);
  const { route, asPath } = useRouter();

  const { data: session } = useSession();
  const user = session?.user as AuthUser;

  const desktopLeftContent = (
    <>
      <Link href="/" _hover={{ textDecoration: "none" }} aria-label="Home link">
        <GeoBuffLogo />
      </Link>

      <NavigationBarLink
        href="/leaderboard"
        label={t.global.leaderboard}
        isActive={route === "/leaderboard"}
        marginLeft={6}
      />

      <NavigationBarLink
        href="/daily-trivia"
        label={t.global.trivia}
        isActive={route.includes("/daily-trivia")}
        marginLeft={6}
      />

      <NavigationBarLink
        href="/community-quiz"
        label={t.global.community}
        isActive={route.includes("/community-quiz")}
        marginLeft={6}
      />

      {isLarge && (
        <>
          <NavigationBarLink
            href="/map-games"
            label={t.global.map}
            isActive={route === "/map-games"}
            marginLeft={6}
          />

          <NavigationBarLink
            href="/flag-games"
            label={t.global.flag}
            isActive={route === "/flag-games"}
            marginLeft={6}
          />

          <NavigationBarLink
            href="/resources"
            label={t.global.resources}
            isActive={route.includes("/resources")}
            marginLeft={6}
          />

          <NavigationBarLink
            href="/merch"
            label={t.global.merch}
            isActive={route.includes("/merch")}
            marginLeft={6}
          />
        </>
      )}
    </>
  );

  const desktopRightContent = (
    <>
      {cart?.length > 0 && (
        <Fade in>
          <ShoppingCartLink itemCount={getItemCount()} marginRight={6} />
        </Fade>
      )}
      <UserAvatarMenu />
      <LanguageSelect ml={3} />
    </>
  );

  const mobileLeftContent = (
    <Link href="/" _hover={{ textDecoration: "none" }}>
      <GeoBuffLogo />
    </Link>
  );

  const mobileRightContent = (
    <Box minWidth="60px">
      <UserAvatarMenu isCondensed />
    </Box>
  );

  const buildCartLink = (itemCount: number) => ({
    href: "/shopping-cart",
    label: t.global.viewCart,
    node: (
      <ShoppingCartLink
        itemCount={itemCount}
        twemojiProps={{ height: "22px", width: "22px" }}
      />
    ),
  });

  const buildQuickLinks = () => {
    const shoppingCartItemCount = getItemCount();
    if (shoppingCartItemCount === 0) {
      return quickLinks;
    }

    const shoppingCartLink = buildCartLink(shoppingCartItemCount);
    // Move shopping cart link to number 2
    return insert(quickLinks, 1, shoppingCartLink);
  };

  const quickLinks = [
    {
      href: "/",
      label: t.global.home,
      emoji: "🏡",
    },
    {
      href: "/leaderboard",
      label: t.global.leaderboard,
      emoji: "🏆",
    },
    {
      href: "/daily-trivia",
      label: t.global.dailyTriviaUpper,
      emoji: "❓",
    },
    {
      href: "/community-quiz",
      label: t.global.communityQuizzesUpper,
      emoji: "🧠",
    },
    {
      href: "/map-games",
      label: t.global.mapGamesUpper,
      emoji: "🗺",
    },
    {
      href: "/flag-games",
      label: t.global.flagGamesUpper,
      emoji: "🎌",
    },
    {
      href: "/resources",
      label: t.global.resources,
      emoji: "🧰",
    },
    {
      href: "/merch",
      label: t.global.merch,
      emoji: "👕",
    },
    {
      href: "/blog",
      label: t.global.blog,
      emoji: "🗞️",
    },
  ];

  const popularQuizzes = [
    {
      href: "/quiz/countries-of-the-world",
      label: t.global.countriesOfTheWorld,
    },
    {
      href: "/quiz/capitals-of-the-world",
      label: t.global.capitalsOfTheWorld,
    },
    {
      href: "/quiz/flags-of-the-world",
      label: t.global.flagsOfTheWorld,
    },
    {
      href: "/quiz/us-states",
      label: t.global.usStates,
    },
  ];

  const sidebarContent = (
    <Flex
      as="nav"
      direction="column"
      height="100%"
      justifyContent="space-between"
      paddingY={2}
    >
      <Flex direction="column" justifyContent="space-between">
        <Box>
          {buildQuickLinks().map((link, index) => (
            <React.Fragment key={index}>
              <NavigationSidebarLink
                key={link.href}
                href={link.href}
                emoji={link?.emoji}
                node={link?.node}
                label={link.label}
                isActive={route === link.href}
              />
              <Divider borderColor="#E3E1E1" borderWidth={1} my={2} />
            </React.Fragment>
          ))}
        </Box>

        <Flex direction="column">
          <Text
            fontSize="16px"
            fontWeight="bold"
            marginTop={8}
            marginBottom={3}
          >
            {t.global.popularQuizzes}
          </Text>

          {popularQuizzes.map(({ href, label }) => (
            <NavigationBarLink
              key={href}
              href={href}
              label={label}
              isActive={asPath === href}
              marginY={1}
            />
          ))}
        </Flex>
      </Flex>

      <LanguageSelect mt={6} mb={user && 6} />

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
            {t.global.createAccountExplainer}
          </Text>
          <Link href="/register">
            <Button
              colorScheme="green"
              size="lg"
              width="100%"
              height="60px"
              fontWeight="bold"
            >
              {t.global.createAnAccount}
            </Button>
          </Link>
        </Flex>
      )}
    </Flex>
  );

  return (
    <NavigationBar
      isAppMobile={process.env.NEXT_PUBLIC_APP_MODE === "mobile"}
      isMobile={isMobile}
      desktopLeftContent={desktopLeftContent}
      desktopRightContent={desktopRightContent}
      mobileLeftContent={mobileLeftContent}
      mobileRightContent={mobileRightContent}
      sidebarContent={sidebarContent}
      isSidebarOpen={isNavSidebarOpen}
      onIsSidebarOpenChange={setIsNavSidebarOpen}
    />
  );
};
