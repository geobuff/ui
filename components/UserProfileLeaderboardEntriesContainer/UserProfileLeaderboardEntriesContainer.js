import React from "react";
import PropTypes from "prop-types";
import { Text } from "@chakra-ui/core";
import UserProfileLeaderboardEntries from "../UserProfileLeaderboardEntries";
import useLeaderboardEntries from "../../hooks/UseLeaderboardEntries";

const UserProfileLeaderboardEntriesContainer = ({ id, quizzes }) => {
  const { entries, isPending } = useLeaderboardEntries(id);

  if (isPending) {
    return <Text>Loading leaderboard entries...</Text>;
  }

  return <UserProfileLeaderboardEntries entries={entries} quizzes={quizzes} />;
};

UserProfileLeaderboardEntriesContainer.propTypes = {
  id: PropTypes.number,
  quizzes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      description: PropTypes.string,
      code: PropTypes.string,
      maxScore: PropTypes.number,
      enabled: PropTypes.bool,
    })
  ),
};

export default UserProfileLeaderboardEntriesContainer;
