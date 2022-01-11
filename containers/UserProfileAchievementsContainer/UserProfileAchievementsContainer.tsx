import React, { FC } from "react";

import UserProfileAchievements from "../../components/UserProfileAchievements";
import useBadges from "../../hooks/UseBadges";
import UserProfileAchievementsPlaceholder from "../../placeholders/UserProfileAchievementsPlaceholder";

interface Props {
  userId?: number;
}

const UserProfileAchievementsContainer: FC<Props> = ({ userId = 0 }) => {
  const { badges, isLoading: badgesLoading } = useBadges(userId);

  if (badgesLoading) {
    return <UserProfileAchievementsPlaceholder />;
  }

  return <UserProfileAchievements badges={badges} />;
};

export default UserProfileAchievementsContainer;
