import { useSession } from "next-auth/react";
import React, { FC } from "react";

import UserProfile from "../../components/UserProfile";
import { AuthUser } from "../../types/auth-user";
import OtherUserProfileContainer from "../OtherUserProfileContainer";

interface Props {
  routeId: number;
}

const UserProfileContainer: FC<Props> = ({ routeId }) => {
  const { data: session, status } = useSession();
  const user = session?.user as AuthUser;

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
