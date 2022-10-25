import React, { FC, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSwipeable } from "react-swipeable";

import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Text,
} from "@chakra-ui/react";

import NavigationSidebarQuicklink from "./NavigationSidebarQuicklink";
import NavigationBarLink from "../NavigationBar/NavigationBarLink";
import ShoppingCartLink from "../ShoppingCartLink";
import { insert } from "../../helpers/array";
import { useSession } from "next-auth/react";
import { AuthUser } from "../../types/auth-user";
import LanguageSelect from "../LanguageSelect/LanguageSelect";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

const isAppMobile = process.env.NEXT_PUBLIC_APP_MODE === "mobile";

const buildCartLink = (itemCount: number) => ({
  href: "/shopping-cart",
  label: "View Cart",
  node: (
    <ShoppingCartLink
      itemCount={itemCount}
      twemojiProps={{ height: 22, width: 22 }}
    />
  ),
});

export interface Props {
  onClose: () => void;
  isOpen: boolean;
  shoppingCartItemCount?: number;
}

const NavigationSidebar: FC<Props> = ({
  onClose,
  isOpen,
  shoppingCartItemCount = 0,
}) => {
  const { t } = useContext(LanguageContext);

  const quickLinks = [
    {
      href: "/",
      label: t.navigation.home,
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
      label: t.navigation.resources,
      emoji: "🧰",
    },
    {
      href: "/merch",
      label: t.navigation.merch,
      emoji: "👕",
    },
    {
      href: "/blog",
      label: t.navigation.blog,
      emoji: "🗞️",
    },
  ];

  const popularQuizzes = [
    {
      href: "/quiz/countries-of-the-world",
      label: t.navigation.countriesOfTheWorld,
    },
    {
      href: "/quiz/capitals-of-the-world",
      label: t.navigation.capitalsOfTheWorld,
    },
    {
      href: "/quiz/flags-of-the-world",
      label: t.navigation.flagsOfTheWorld,
    },
    {
      href: "/quiz/us-states",
      label: t.navigation.usStates,
    },
  ];

  const { data: session } = useSession();
  const user = session?.user as AuthUser;

  const { route, asPath } = useRouter();

  const handlers = useSwipeable({
    onSwipedLeft: () => isAppMobile && onClose(),
    trackTouch: true,
    trackMouse: false,
    rotationAngle: 0,
  });

  const buildQuickLinks = () => {
    if (shoppingCartItemCount === 0) {
      return quickLinks;
    }

    const shoppingCartLink = buildCartLink(shoppingCartItemCount);
    // Move shopping cart link to number 2
    return insert(quickLinks, 1, shoppingCartLink);
  };

  return (
    <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerBody marginTop="72px" {...handlers}>
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
                    <NavigationSidebarQuicklink
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
                  {t.navigation.popularQuizzes}
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

            <LanguageSelect mt={6} />

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
                  {t.navigation.createAccountExplainer}
                </Text>
                <Link href="/register">
                  <Button
                    colorScheme="green"
                    size="lg"
                    width="100%"
                    height="60px"
                    fontWeight="bold"
                  >
                    {t.navigation.createAnAccount}
                  </Button>
                </Link>
              </Flex>
            )}
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default NavigationSidebar;
