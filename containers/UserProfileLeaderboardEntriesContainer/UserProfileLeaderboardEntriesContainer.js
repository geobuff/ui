import React from "react";
import PropTypes from "prop-types";

import UserProfileLeaderboardEntries from "../../components/UserProfileLeaderboardEntries";
import useLeaderboardEntries from "../../hooks/UseLeaderboardEntries";
import UserProfileLeaderboardEntriesPlaceholder from "../../placeholders/UserProfileLeaderboardEntriesPlaceholder";

const UserProfileLeaderboardEntriesContainer = ({ userId }) => {
  const { entries, isPending } = useLeaderboardEntries(userId);

  if (isPending) {
    return <UserProfileLeaderboardEntriesPlaceholder />;
  }

  return <UserProfileLeaderboardEntries entries={entries} />;
};

UserProfileLeaderboardEntriesContainer.propTypes = {
  userId: PropTypes.number,
};

export default UserProfileLeaderboardEntriesContainer;
