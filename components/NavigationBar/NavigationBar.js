import React from "react";
import { Box, Button, Flex, Link, Text } from "@chakra-ui/core";
import {
  Menu,
  MenuList,
  MenuItem,
  MenuDivider,
  MenuButton,
} from "@chakra-ui/react";
import Twemoji from "../Twemoji";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/router";

const NavigationBar = () => {
  const {
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    logout,
    user,
  } = useAuth0();
  const router = useRouter();

  return (
    <Box
      m={0}
      py={2}
      px={5}
      backgroundColor="white"
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.08)"
      position="relative"
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Link href="/" _hover={{ textDecoration: "none" }}>
          <Text ml={2} fontSize={[22, 26, 26]} fontWeight="bold">
            <Twemoji
              emoji="🌏"
              height={[6, 7, 7]}
              width={[6, 7, 7]}
              pt={["4px", "5px", "5px"]}
              mr={2}
            />
            {"GeoBuff"}
          </Text>
        </Link>
        {!isLoading && isAuthenticated ? (
          <Menu>
            <MenuButton
              as={Button}
              boxSize="2.5rem"
              borderRadius="full"
              backgroundImage={`url(${user?.picture})`}
              backgroundSize="cover"
              _hover={{
                backgroundImage: `${`url(${user?.picture})`}`,
                backgroundSize: "cover",
              }}
              _active={{
                backgroundImage: `${`url(${user?.picture})`}`,
                backgroundSize: "cover",
              }}
            ></MenuButton>
            <MenuList>
              <MenuItem onClick={() => router.push("/profile")}>
                Profile
              </MenuItem>
              <MenuDivider />
              <MenuItem
                onClick={() =>
                  logout({ returnTo: process.env.NEXT_PUBLIC_REDIRECT_URI })
                }
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Button onClick={loginWithRedirect}>Log in</Button>
        )}
      </Flex>
    </Box>
  );
};

export default NavigationBar;
