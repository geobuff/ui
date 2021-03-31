import { useEffect, useState } from "react";

import axiosClient from "../axios/axiosClient";

const useLeaderboardEntries = (userId) => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axiosClient.get(`/world-countries/leaderboard/${userId}`),
      axiosClient.get(`/world-capitals/leaderboard/${userId}`),
    ]).then((response) => {
      setEntries(response.filter((x) => x.status === 200).map((x) => x.data));
      setLoading(false);
    });
  }, []);

  return {
    entries: entries,
    isLoading: loading,
  };
};

export default useLeaderboardEntries;
