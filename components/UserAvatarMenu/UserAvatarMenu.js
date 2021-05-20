import React from "react";
import PropTypes from "prop-types";

import { useRouter } from "next/router";

import {
  Button,
  Flex,
  Menu,
  MenuList,
  MenuItem,
  MenuDivider,
  MenuButton,
  Skeleton,
  SkeletonCircle,
  Text,
  Avatar,
} from "@chakra-ui/react";

import useCurrentUser from "../../hooks/UseCurrentUser";
import SolidChevronDown from "../../Icons/SolidChevronDown";

const UserAvatarMenu = ({ isCondensed }) => {
  const { user, isLoading, clearUser } = useCurrentUser();
  const router = useRouter();

  const avatarSize = isCondensed ? "26px" : { base: "22px", md: "26px" };

  const logout = () => {
    clearUser();
    router.push("/");
  };

  if (isLoading) {
    return (
      <Flex
        alignItems="center"
        backgroundColor="#F3F3F3"
        border="1px solid transparent"
        borderRadius={12}
        paddingY={{ base: 1.5, md: 2 }}
        paddingX={{ base: 1.5, md: 3 }}
        margin={0}
      >
        <SkeletonCircle
          height={{ base: "22px", md: "26px" }}
          width={{ base: "22px", md: "26px" }}
        />
        <Skeleton
          marginLeft={1.5}
          marginRight={0.5}
          height={{ base: "16px", md: "18px" }}
          width={{ base: "80px", md: "100px" }}
        />
      </Flex>
    );
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
            <Avatar
              height={avatarSize}
              width={avatarSize}
              src={user?.picture}
              name={user.username}
              marginX={isCondensed ? 1 : 0}
            />

            {!isCondensed && (
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
            )}
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
          <MenuItem onClick={logout}>{"Logout"}</MenuItem>
        </MenuList>
      </Menu>
    );
  }

  return (
    <Flex alignContent="center">
      <Button
        variant="link"
        color="gray.600"
        fontWeight={600}
        onClick={() => router.push("/login")}
        mr={6}
      >
        {"Login"}
      </Button>
      <Button colorScheme="green" onClick={() => router.push("/register")}>
        {"Register"}
      </Button>
    </Flex>
  );
};

UserAvatarMenu.propTypes = {
  isCondensed: PropTypes.bool,
};

UserAvatarMenu.defaultProps = {
  isCondensed: false,
};

export default UserAvatarMenu;
