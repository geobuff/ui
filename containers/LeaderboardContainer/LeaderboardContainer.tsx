import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import axiosClient from "../../axios/axiosClient";

import useQuizzes from "../../hooks/UseQuizzes";
import Leaderboard from "../../components/Leaderboard";

const LeaderboardContainer = ({ defaultQuizId, rankParam }) => {
  const { quizzes, isLoading: isLoadingQuizzes } = useQuizzes();

  const [quizId, setQuizId] = useState(() => defaultQuizId);
  const [entries, setEntries] = useState([]);
  const [isLoadingEntries, setIsLoadingEntries] = useState(true);
  const [hasMoreEntries, setHasMoreEntries] = useState(false);
  const [filterParams, setFilterParams] = useState({ page: 0, limit: 10 });
  const [rank, setRank] = useState("");
  const [rankSet, setRankSet] = useState(false);

  const isLoading = isLoadingEntries || isLoadingQuizzes;

  useEffect(() => {
    if (!rankSet && !rank && rankParam) {
      setRank(rankParam);
      setFilterParams({
        ...filterParams,
        rank: parseInt(rankParam),
      });
      setRankSet(true);
    }
  }, [rank, rankParam, rankSet]);

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
      rank={rank}
      setRank={setRank}
    />
  );
};

LeaderboardContainer.propTypes = {
  defaultQuizId: PropTypes.string,
  rankParam: PropTypes.string,
};

LeaderboardContainer.defaultProps = {
  defaultQuizId: "1", // COTW
};

export default LeaderboardContainer;
