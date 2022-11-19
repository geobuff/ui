import React, { FC } from "react";

import useBadges from "../../hooks/UseUserBadges";

import UserProfileAchievements from "../../components/UserProfileAchievements";

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
