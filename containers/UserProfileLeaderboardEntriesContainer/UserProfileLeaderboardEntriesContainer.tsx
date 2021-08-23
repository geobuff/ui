import React, { FC } from "react";

import UserProfileLeaderboardEntries from "../../components/UserProfileLeaderboardEntries";
import useLeaderboardEntries from "../../hooks/UseLeaderboardEntries";
import UserProfileLeaderboardEntriesPlaceholder from "../../placeholders/UserProfileLeaderboardEntriesPlaceholder";

interface Props {
  userId: number;
}

const UserProfileLeaderboardEntriesContainer: FC<Props> = ({ userId }) => {
  const { entries, isLoading } = useLeaderboardEntries(userId);

  if (isLoading) {
    return <UserProfileLeaderboardEntriesPlaceholder />;
  }

  return <UserProfileLeaderboardEntries entries={entries} />;
};

export default UserProfileLeaderboardEntriesContainer;
