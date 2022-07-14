import React, { FC, useContext } from "react";

import { useRouter } from "next/router";

import {
  Button,
  Flex,
  Fade,
  Menu,
  MenuList,
  MenuItem,
  MenuDivider,
  MenuButton,
  Skeleton,
  SkeletonCircle,
  Text,
} from "@chakra-ui/react";

import Image from "../Image";

import SolidChevronDown from "../../Icons/SolidChevronDown";
import Twemoji from "../Twemoji";
import { signOut, useSession } from "next-auth/react";
import { CurrentUserContext } from "../../context/CurrentUserContext/CurrentUserContext";

interface Props {
  isCondensed?: boolean;
}

const UserAvatarMenu: FC<Props> = ({ isCondensed = false }) => {
  const router = useRouter();

  const { status } = useSession();
  const { user, clearUser } = useContext(CurrentUserContext);

  const avatarSize = isCondensed ? "26px" : { base: "22px", md: "26px" };
  const imageSize = isCondensed ? "13px" : { base: "11px", md: "13px" };

  const logout = (): void => {
    clearUser();
    signOut();
  };

  if (status === "loading") {
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

  if (status === "authenticated") {
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
            <Flex
              alignItems="center"
              borderRadius={"100%"}
              backgroundColor="#276f86"
              border="solid 2px #1A202C"
              height={avatarSize}
              width={avatarSize}
              marginX={isCondensed ? 1 : 0}
            >
              <Image
                src={user?.avatarPrimaryImageUrl}
                height={imageSize}
                width={imageSize}
                hasSkeleton={false}
                marginX="auto"
              />
            </Flex>

            {!isCondensed && (
              <Text
                marginLeft={1.5}
                marginRight={0.5}
                fontWeight="bold"
                fontSize={{ base: "10px", md: "12px" }}
                noOfLines={1}
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
          {user?.isAdmin && (
            <>
              <MenuItem onClick={(): Promise<boolean> => router.push(`/admin`)}>
                <Twemoji emoji="👑" width={5} mr={2} /> {"Admin Dashboard"}
              </MenuItem>
              <MenuDivider />
            </>
          )}
          <MenuItem
            onClick={(): Promise<boolean> =>
              router.push(`/profile/${user?.id}`)
            }
          >
            {"Profile"}
          </MenuItem>
          <MenuItem onClick={(): Promise<boolean> => router.push("/orders")}>
            {"My Orders"}
          </MenuItem>
          <MenuDivider />
          <MenuItem onClick={logout}>{"Logout"}</MenuItem>
        </MenuList>
      </Menu>
    );
  }

  return (
    <Fade in>
      <Flex alignContent="center">
        <Button
          variant="link"
          color="gray.600"
          fontWeight={600}
          onClick={(): Promise<boolean> => router.push("/login")}
          mr={4}
        >
          {"Login"}
        </Button>
        {!isCondensed && (
          <Button
            colorScheme="green"
            onClick={(): Promise<boolean> => router.push("/register")}
          >
            {"Register"}
          </Button>
        )}
      </Flex>
    </Fade>
  );
};

export default UserAvatarMenu;
