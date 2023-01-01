import React, { FC, useContext } from "react";

import { Twemoji } from "@geobuff/buff-ui/components";
import { SolidChevronDown } from "@geobuff/buff-ui/components";

import {
  Button,
  Fade,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Skeleton,
  SkeletonCircle,
  Text,
} from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { LanguageContext } from "../../contexts/LanguageContext";

interface Props {
  isCondensed?: boolean;
}

const UserAvatarMenu: FC<Props> = ({ isCondensed = false }) => {
  const router = useRouter();
  const { t } = useContext(LanguageContext);

  const { status } = useSession();
  const { user, clearUser } = useContext(CurrentUserContext);

  const avatarSize = isCondensed ? "26px" : { base: "22px", md: "26px" };

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
              justifyContent="center"
              borderRadius={"100%"}
              backgroundColor="#276f86"
              border="solid 2px #1A202C"
              height={avatarSize}
              width={avatarSize}
              marginX={isCondensed ? 1 : 0}
            >
              {user?.avatarPrimaryImageUrl && (
                <Image
                  src={user?.avatarPrimaryImageUrl}
                  alt="User avatar"
                  height={13}
                  width={13}
                  priority
                />
              )}
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
                <Twemoji emoji="👑" width="20px" height="20px" mr={2} />
                {` ${t.global.adminDashboard}`}
              </MenuItem>
              <MenuDivider />
            </>
          )}
          <MenuItem
            onClick={(): Promise<boolean> =>
              router.push(`/profile/${user?.id}`)
            }
          >
            {t.global.profile}
          </MenuItem>
          <MenuItem onClick={(): Promise<boolean> => router.push("/orders")}>
            {t.global.myOrders}
          </MenuItem>
          <MenuDivider />
          <MenuItem onClick={logout}>{t.global.logout}</MenuItem>
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
          {t.global.login}
        </Button>
        {!isCondensed && (
          <Button
            colorScheme="green"
            onClick={(): Promise<boolean> => router.push("/register")}
          >
            {t.global.register}
          </Button>
        )}
      </Flex>
    </Fade>
  );
};

export default UserAvatarMenu;
