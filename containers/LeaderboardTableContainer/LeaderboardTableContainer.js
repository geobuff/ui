import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Text } from "@chakra-ui/core";

import LeaderboardTable from "../../components/LeaderboardTable";
import { getApiPath } from "../../helpers/quizzes";

const LeaderboardTableContainer = ({ quiz, filterParams, setHasMore }) => {
  const [entries, setEntries] = useState();

  useEffect(() => {
    const params = {
      method: "POST",
      body: JSON.stringify(filterParams),
    };

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${getApiPath(quiz)}/leaderboard/all`,
      params
    )
      .then((response) => response.json())
      .then((data) => {
        setHasMore(data.hasMore);
        setEntries(data.entries);
      });
  }, [filterParams]);

  if (!entries) {
    return <Text>Loading table...</Text>;
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
  quiz: PropTypes.number,
  filterParams: PropTypes.shape({
    page: PropTypes.number,
    limit: PropTypes.number,
    range: PropTypes.string,
    user: PropTypes.string,
  }),
  setHasMore: PropTypes.func,
};

export default LeaderboardTableContainer;
