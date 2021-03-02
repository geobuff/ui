import React from "react";
import PropTypes from "prop-types";
import { Text } from "@chakra-ui/react";
import UserProfileLeaderboardEntries from "../../components/UserProfileLeaderboardEntries";
import useLeaderboardEntries from "../../hooks/UseLeaderboardEntries";

const UserProfileLeaderboardEntriesContainer = ({ id }) => {
  const { entries, isPending } = useLeaderboardEntries(id);

  if (isPending) {
    return <Text>Loading leaderboard entries...</Text>;
  }

  return <UserProfileLeaderboardEntries entries={entries} />;
};

UserProfileLeaderboardEntriesContainer.propTypes = {
  id: PropTypes.number,
};

export default UserProfileLeaderboardEntriesContainer;
