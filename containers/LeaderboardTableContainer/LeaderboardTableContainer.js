import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import LeaderboardTable from "../../components/LeaderboardTable";
import LeaderboardTablePlaceholder from "../../placeholders/LeaderboardTablePlaceholder";
import axiosClient from "../../axios/axiosClient";

const LeaderboardTableContainer = ({ quizId, filterParams, setHasMore }) => {
  const [entries, setEntries] = useState([]);
  const [isLoadingEntries, setIsLoadingEntries] = useState(true);

  useEffect(() => {
    setIsLoadingEntries(true);
    axiosClient
      .post(`/leaderboard/all/${quizId}`, filterParams)
      .then((response) => {
        setHasMore(response.data.hasMore);
        setEntries(response.data.entries);
        setIsLoadingEntries(false);
      });
  }, [quizId, filterParams]);

  if (isLoadingEntries) {
    return <LeaderboardTablePlaceholder rows={filterParams.limit} />;
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
