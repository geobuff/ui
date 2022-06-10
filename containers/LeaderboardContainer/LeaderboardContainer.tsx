import React, { useEffect, useState, FC } from "react";

import axiosClient from "../../axios/axiosClient";

import Leaderboard from "../../components/Leaderboard";
import { LeaderboardFilterParams } from "../../types/leaderboard-filter-params";
import { Quiz } from "../../types/quiz";

interface Props {
  defaultQuizId?: string;
  rankParam?: string;
  quizzes?: Quiz[];
}

const LeaderboardContainer: FC<Props> = ({
  defaultQuizId = "1",
  rankParam = "",
  quizzes = [],
}) => {
  const [quizId, setQuizId] = useState(() => defaultQuizId);
  const [entries, setEntries] = useState([]);
  const [isLoadingEntries, setIsLoadingEntries] = useState(true);
  const [hasMoreEntries, setHasMoreEntries] = useState(false);
  const [filterParams, setFilterParams] = useState<LeaderboardFilterParams>({
    page: 0,
    limit: 10,
  });
  const [rank, setRank] = useState("");
  const [rankSet, setRankSet] = useState(false);

  const isLoading = isLoadingEntries;

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
      quizzes={quizzes?.filter((x) => x.hasLeaderboard)}
      onChangeFilterParams={setFilterParams}
      onChangeQuiz={setQuizId}
      hasMoreEntries={hasMoreEntries}
      filterParams={filterParams}
      rank={rank}
      setRank={setRank}
    />
  );
};

export default LeaderboardContainer;
