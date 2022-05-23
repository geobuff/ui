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

import { CurrentUserContext } from "../../context/CurrentUserContext";
import NavigationSidebarQuicklink from "./NavigationSidebarQuicklink";
import NavigationBarLink from "../NavigationBar/NavigationBarLink";
import ShoppingCartLink from "../ShoppingCartLink";
import build from "next/dist/build";
import { insert } from "../../helpers/array";

const isAppMobile = process.env.NEXT_PUBLIC_APP_MODE === "mobile";

const createAccountExplainer =
  "Don't have an account? Sign up today to earn XP, unlock badges and compete with friends!";

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

const quickLinks = [
  {
    href: "/",
    label: "Home",
    emoji: "🏡",
  },
  {
    href: "/leaderboard",
    label: "Leaderboard",
    emoji: "🏆",
  },
  {
    href: "/daily-trivia",
    label: "Daily Trivia",
    emoji: "❓",
  },
  {
    href: "/community-quiz",
    label: "Community Quizzes",
    emoji: "🧠",
  },
  {
    href: "/map-games",
    label: "Map Games",
    emoji: "🗺",
  },
  {
    href: "/flag-games",
    label: "Flag Games",
    emoji: "🎌",
  },
  {
    href: "/merch",
    label: "Merch",
    emoji: "👕",
  },
];

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
  const { user } = useContext(CurrentUserContext);

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
                {buildQuickLinks().map((link) => (
                  <>
                    <NavigationSidebarQuicklink
                      key={link.href}
                      href={link.href}
                      emoji={link?.emoji}
                      node={link?.node}
                      label={link.label}
                      isActive={route === link.href}
                    />
                    <Divider borderColor="#E3E1E1" borderWidth={1} my={2} />
                  </>
                ))}
              </Box>

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
  );
};

export default NavigationSidebar;
