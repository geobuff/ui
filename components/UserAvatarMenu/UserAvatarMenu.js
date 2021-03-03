import React, { useState, useEffect } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/router";

import {
  Button,
  Menu,
  MenuList,
  MenuItem,
  MenuDivider,
  MenuButton,
  SkeletonCircle,
} from "@chakra-ui/react";

import UserAvatar from "../UserAvatar";
import useCurrentUser from "../../hooks/UseCurrentUser";

const UserAvatarMenu = () => {
  const [isUserLoading, setIsUserLoading] = useState(true);

  const { loginWithRedirect, logout } = useAuth0();
  const { user } = useCurrentUser();
  const router = useRouter();

  // Don't need to wait for Auth0 user if
  // we can retrieve user from localStorage
  useEffect(() => {
    user && setIsUserLoading(false);
  }, [user]);

  if (isUserLoading) {
    return <SkeletonCircle height="36px" width="36px" />;
  }

  if (user) {
    return (
      <Menu>
        <MenuButton
          as={Button}
          backgroundColor="transparent"
          borderRadius={50}
          padding={0}
          margin={0}
          height="36px"
          minWidth="36px"
        >
          <UserAvatar
            height="36px"
            width="36px"
            imageUrl={user?.picture}
            alt={`${user?.username}'s profile image`}
          />
        </MenuButton>

        <MenuList>
          <MenuItem onClick={() => router.push("/profile")}>
            {"Profile"}
          </MenuItem>

          <MenuItem onClick={() => router.push("/leaderboard")}>
            {"Leaderboard"}
          </MenuItem>

          <MenuDivider />
          <MenuItem
            onClick={() =>
              logout({ returnTo: process.env.NEXT_PUBLIC_REDIRECT_URI })
            }
          >
            {"Logout"}
          </MenuItem>
        </MenuList>
      </Menu>
    );
  }

  return <Button onClick={loginWithRedirect}>{"Log in"}</Button>;
};

UserAvatarMenu.propTypes = {};
UserAvatarMenu.defaultProps = {};

export default UserAvatarMenu;
