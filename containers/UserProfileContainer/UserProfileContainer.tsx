import React, { FC, useContext } from "react";

import UserProfile from "../../components/UserProfile";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import OtherUserProfileContainer from "../OtherUserProfileContainer";

interface Props {
  routeId: number;
}

const UserProfileContainer: FC<Props> = ({ routeId }) => {
  const { user, isLoading: isUserLoading } = useContext(CurrentUserContext);

  if (isUserLoading) {
    return null;
  }

  return user?.id === routeId ? (
    <UserProfile user={user} isCurrentUser />
  ) : (
    <OtherUserProfileContainer userId={routeId} />
  );
};

export default UserProfileContainer;
