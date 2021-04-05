import React, { useState, useEffect } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/router";

import {
  Button,
  Flex,
  Menu,
  MenuList,
  MenuItem,
  MenuDivider,
  MenuButton,
  SkeletonCircle,
  Text,
} from "@chakra-ui/react";

import UserAvatar from "../UserAvatar";
import useCurrentUser from "../../hooks/UseCurrentUser";

import SolidChevronDown from "../../Icons/SolidChevronDown";

const UserAvatarMenu = () => {
  const [isUserLoading, setIsUserLoading] = useState(true);

  const { loginWithRedirect, logout, isLoading } = useAuth0();
  const { user, clearUser } = useCurrentUser();
  const router = useRouter();

  const logoutUser = () => {
    logout({ returnTo: process.env.NEXT_PUBLIC_REDIRECT_URI });
    clearUser();
  };

  // Don't need to wait for Auth0 user if
  // we can retrieve user from localStorage
  useEffect(() => {
    if (user) {
      setIsUserLoading(false);
    }

    if (!isLoading && !user) {
      setIsUserLoading(false);
    }
  }, [user, isLoading]);

  if (isUserLoading) {
    return <SkeletonCircle height="36px" width="36px" />;
  }

  if (user) {
    return (
      <Menu>
        <MenuButton
          backgroundColor="#F3F3F3"
          border="1px solid transparent"
          borderRadius={12}
          paddingY={{ base: 1.5, md: 2 }}
          paddingX={{ base: 1.5, md: 3 }}
          margin={0}
          height={{ base: "34px", md: "42px" }}
          _hover={{
            backgroundColor: "#e6e6e6",
          }}
          _active={{
            border: "1px solid",
            borderColor: "blue.500",
          }}
          _focus={{
            border: "1px solid",
            borderColor: "blue.500",
          }}
        >
          <Flex alignItems="center">
            <UserAvatar
              height={{ base: "22px", md: "26px" }}
              width={{ base: "22px", md: "26px" }}
              imageUrl={user?.picture}
              alt={`${user?.username}'s profile image`}
            />
            <Text
              marginLeft={1.5}
              marginRight={0.5}
              fontWeight="bold"
              fontSize={{ base: "10px", md: "12px" }}
              isTruncated
              maxWidth={{ base: "80px", md: "125px", lg: "135px" }}
            >
              {user?.username}
            </Text>
            <SolidChevronDown
              height={{ base: "10px", md: "12px" }}
              width={{ base: "10px", md: "12px" }}
              marginLeft="1px"
            />
          </Flex>
        </MenuButton>

        <MenuList>
          <MenuItem onClick={() => router.push("/profile")}>
            {"Profile"}
          </MenuItem>

          <MenuItem onClick={() => router.push("/leaderboard")}>
            {"Leaderboard"}
          </MenuItem>

          <MenuDivider />
          <MenuItem onClick={logoutUser}>{"Logout"}</MenuItem>
        </MenuList>
      </Menu>
    );
  }

  return <Button onClick={loginWithRedirect}>{"Log in"}</Button>;
};

UserAvatarMenu.propTypes = {};
UserAvatarMenu.defaultProps = {};

export default UserAvatarMenu;
