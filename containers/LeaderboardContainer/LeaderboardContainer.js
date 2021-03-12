import React from "react";
import PropTypes from "prop-types";

import useQuizzes from "../../hooks/UseQuizzes";
import Leaderboard from "../../components/Leaderboard";

const LeaderboardContainer = ({ quizId }) => {
  const { quizzes, loading } = useQuizzes();

  if (loading) {
    return null;
  }

  return (
    <Leaderboard
      quizId={quizId}
      quizzes={quizzes.filter((x) => x.hasLeaderboard)}
    />
  );
};

LeaderboardContainer.propTypes = {
  quizId: PropTypes.number,
};

export default LeaderboardContainer;
