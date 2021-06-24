import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import axiosClient from "../../axios/axiosClient";

import useQuizzes from "../../hooks/UseQuizzes";
import Leaderboard from "../../components/Leaderboard";

const LeaderboardContainer = ({ defaultQuizId }) => {
  const { quizzes, isLoadingQuizzes } = useQuizzes();

  const [quizId, setQuizId] = useState(() => defaultQuizId);
  const [entries, setEntries] = useState([]);
  const [isLoadingEntries, setIsLoadingEntries] = useState(true);
  const [hasMoreEntries, setHasMoreEntries] = useState(false);
  const [filterParams, setFilterParams] = useState({ page: 0, limit: 10 });

  const isLoading = isLoadingEntries || isLoadingQuizzes;

  useEffect(() => {
    setIsLoadingEntries(true);
    axiosClient
      .post(`/leaderboard/all/${quizId}`, filterParams)
      .then((response) => {
        setHasMoreEntries(response.data.hasMore);
        setEntries(response.data.entries);
        setIsLoadingEntries(false);
      });
  }, [quizId, filterParams]);

  return (
    <Leaderboard
      entries={entries}
      isLoading={isLoading}
      quizId={quizId}
      quizzes={quizzes.filter((x) => x.hasLeaderboard)}
      onChangeFilterParams={setFilterParams}
      onChangeQuiz={setQuizId}
      hasMoreEntries={hasMoreEntries}
      filterParams={filterParams}
    />
  );
};

LeaderboardContainer.propTypes = {
  defaultQuizId: PropTypes.number,
};

LeaderboardContainer.defaultProps = {
  defaultQuizId: 1, // COTW
};

export default LeaderboardContainer;
