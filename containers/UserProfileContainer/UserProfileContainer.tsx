import React, { FC, useContext } from "react";

import { useSession } from "next-auth/react";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import UserProfile from "../../components/UserProfile";

import OtherUserProfileContainer from "../OtherUserProfileContainer";

interface Props {
  routeId: number;
}

const UserProfileContainer: FC<Props> = ({ routeId }) => {
  const { status } = useSession();
  const { user } = useContext(CurrentUserContext);

  if (status === "loading") {
    return null;
  }

  return status === "authenticated" && user?.id === routeId ? (
    <UserProfile user={user} isCurrentUser />
  ) : (
    <OtherUserProfileContainer userId={routeId} />
  );
};

export default UserProfileContainer;
