import { useSession } from "next-auth/react";
import React, { FC, useContext } from "react";

import UserProfile from "../../components/UserProfile";
import { CurrentUserContext } from "../../context/CurrentUserContext/CurrentUserContext";
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
