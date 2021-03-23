import React from "react";
import PropTypes from "prop-types";

import UserProfileAchievements from "../../components/UserProfileAchievements";
import useBadges from "../../hooks/UseBadges";
import useUserBadges from "../../hooks/UseUserBadges";
import UserProfileAchievementsPlaceholder from "../../placeholders/UserProfileAchievementsPlaceholder";

const UserProfileAchievementsContainer = ({ user }) => {
  const { badges, badgesLoading } = useBadges();
  const { userBadges, userBadgesLoading } = useUserBadges(user.id);

  if (badgesLoading || userBadgesLoading) {
    return <UserProfileAchievementsPlaceholder />;
  }

  return (
    <UserProfileAchievements
      user={user}
      badges={badges}
      userBadges={userBadges}
    />
  );
};

UserProfileAchievementsContainer.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    countryCode: PropTypes.string,
    xp: PropTypes.number,
    email: PropTypes.string,
    picture: PropTypes.string,
  }),
};

export default UserProfileAchievementsContainer;
