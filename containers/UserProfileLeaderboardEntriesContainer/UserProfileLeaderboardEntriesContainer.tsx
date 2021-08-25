import React, { FC } from "react";

import UserProfileLeaderboardEntries from "../../components/UserProfileLeaderboardEntries";
import useUserLeaderboardEntries from "../../hooks/UseUserLeaderboardEntries";
import UserProfileLeaderboardEntriesPlaceholder from "../../placeholders/UserProfileLeaderboardEntriesPlaceholder";

interface Props {
  userId: number;
}

const UserProfileLeaderboardEntriesContainer: FC<Props> = ({ userId }) => {
  const { entries, isLoading } = useUserLeaderboardEntries(userId);

  if (isLoading) {
    return <UserProfileLeaderboardEntriesPlaceholder />;
  }

  return <UserProfileLeaderboardEntries entries={entries} />;
};

export default UserProfileLeaderboardEntriesContainer;
