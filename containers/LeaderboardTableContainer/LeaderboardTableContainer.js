import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Text } from "@chakra-ui/core";

import LeaderboardTable from "../../components/LeaderboardTable";

const LeaderboardTableContainer = ({ filterParams }) => {
  const [entries, setEntries] = useState();

  useEffect(() => {
    const params = {
      method: "POST",
      body: JSON.stringify(filterParams),
    };

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/countries/leaderboard/all`,
      params
    )
      .then((response) => response.json())
      .then((data) => data.entries)
      .then((data) => setEntries(data));
  }, []);

  if (!entries) {
    return <Text>Loading table...</Text>;
  }

  return <LeaderboardTable entries={entries}></LeaderboardTable>;
};

LeaderboardTableContainer.propTypes = {
  filterParams: PropTypes.shape({
    page: PropTypes.number,
    limit: PropTypes.number,
    range: PropTypes.string,
    user: PropTypes.string,
  }),
};

export default LeaderboardTableContainer;
