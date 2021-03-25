import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import LeaderboardTable from "../../components/LeaderboardTable";
import LeaderboardTablePlaceholder from "../../placeholders/LeaderboardTablePlaceholder";
import useQuiz from "../../hooks/UseQuiz";
import axiosClient from "../../axios/axiosClient";

const LeaderboardTableContainer = ({ quizId, filterParams, setHasMore }) => {
  const { quiz, isLoading } = useQuiz(quizId);

  const [entries, setEntries] = useState();
  const [loadingEntries, setLoadingEntries] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      setLoadingEntries(true);

      axiosClient
        .post(`/${quiz.apiPath}/leaderboard/all`, filterParams)
        .then((response) => {
          setHasMore(response.data.hasMore);
          setEntries(response.data.entries);
          setLoadingEntries(false);
        });
    }
  }, [quizId, isLoading, filterParams]);

  if (loadingEntries) {
    return <LeaderboardTablePlaceholder noOfLines={filterParams.limit} />;
  }

  return (
    <LeaderboardTable
      page={filterParams.page}
      limit={filterParams.limit}
      entries={entries}
    />
  );
};

LeaderboardTableContainer.propTypes = {
  quizId: PropTypes.number,
  filterParams: PropTypes.shape({
    page: PropTypes.number,
    limit: PropTypes.number,
    range: PropTypes.string,
    user: PropTypes.string,
  }),
  setHasMore: PropTypes.func,
};

export default LeaderboardTableContainer;
