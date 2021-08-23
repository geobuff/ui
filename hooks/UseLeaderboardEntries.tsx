import useSWR from "swr";
import { fetcher } from "../helpers/fetcher";

const useLeaderboardEntries = (userId) => {
  const { data, error } = useSWR(`/leaderboard/${userId}`, fetcher);

  return {
    entries: data || [],
    isLoading: !data,
    error: error,
  };
};

export default useLeaderboardEntries;
