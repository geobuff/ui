import React from "react";
import PropTypes from "prop-types";

import UserProfileAchievements from "../../components/UserProfileAchievements";
import useBadges from "../../hooks/UseBadges";
import useScores from "../../hooks/UseScores";
import useLeaderboardEntries from "../../hooks/UseLeaderboardEntries";
import UserProfileAchievementsPlaceholder from "../../placeholders/UserProfileAchievementsPlaceholder";

const UserProfileAchievementsContainer = ({ user }) => {
  const { badges, isLoading: badgesLoading } = useBadges();
  const { scores, isLoading: scoresLoading } = useScores(user?.id);
  const { entries, isLoading: entriesLoading } = useLeaderboardEntries(
    user?.id
  );

  if (badgesLoading || scoresLoading || entriesLoading || !user) {
    return <UserProfileAchievementsPlaceholder />;
  }

  return (
    <UserProfileAchievements
      badges={badges}
      scores={scores}
      entriesCount={entries.length}
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

UserProfileAchievementsContainer.defaultProps = {
  user: null,
};

export default UserProfileAchievementsContainer;
