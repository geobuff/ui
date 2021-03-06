import React from "react";
import PropTypes from "prop-types";
import { Text } from "@chakra-ui/react";
import UserProfileLeaderboardEntries from "../../components/UserProfileLeaderboardEntries";
import useLeaderboardEntries from "../../hooks/UseLeaderboardEntries";

const UserProfileLeaderboardEntriesContainer = ({ userId }) => {
  const { entries, isPending } = useLeaderboardEntries(userId);

  if (isPending) {
    return <Text>Loading leaderboard entries...</Text>;
  }

  return <UserProfileLeaderboardEntries entries={entries} />;
};

UserProfileLeaderboardEntriesContainer.propTypes = {
  userId: PropTypes.number,
};

export default UserProfileLeaderboardEntriesContainer;
