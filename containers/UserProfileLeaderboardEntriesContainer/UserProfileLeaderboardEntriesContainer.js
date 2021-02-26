import React from "react";
import PropTypes from "prop-types";
import { Text } from "@chakra-ui/react";
import UserProfileLeaderboardEntries from "../../components/UserProfileLeaderboardEntries";
import useLeaderboardEntries from "../../hooks/UseLeaderboardEntries";

const UserProfileLeaderboardEntriesContainer = ({ id, quizzes }) => {
  const { entries, isPending } = useLeaderboardEntries(id);

  if (isPending) {
    return <Text>Loading leaderboard entries...</Text>;
  }

  entries[0].quizId = 1;
  entries[1].quizId = 2;
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
