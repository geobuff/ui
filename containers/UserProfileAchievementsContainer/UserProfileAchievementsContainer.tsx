import React, { FC } from "react";

import UserProfileAchievements from "../../components/UserProfileAchievements";
import useBadges from "../../hooks/UseBadges";
import useUserLeaderboardEntries from "../../hooks/UseUserLeaderboardEntries";
import UserProfileAchievementsPlaceholder from "../../placeholders/UserProfileAchievementsPlaceholder";
import { UserDto } from "../../types/user-dto";

interface Props {
  user?: UserDto;
}

const UserProfileAchievementsContainer: FC<Props> = ({ user = null }) => {
  const { badges, isLoading: badgesLoading } = useBadges();
  const { entries, isLoading: entriesLoading } = useUserLeaderboardEntries(
    user?.id
  );

  if (badgesLoading || entriesLoading || !user) {
    return <UserProfileAchievementsPlaceholder />;
  }

  return <UserProfileAchievements badges={badges} entries={entries} />;
};

export default UserProfileAchievementsContainer;
