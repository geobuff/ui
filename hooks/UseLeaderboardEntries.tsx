import useSWR from "swr";
import { fetcher } from "../helpers/fetcher";
import { LeaderboardEntry } from "../types/leaderboard-entry";

interface Result {
  entries: Array<LeaderboardEntry>;
  isLoading: boolean;
}

const useLeaderboardEntries = (userId: number): Result => {
  const { data } = useSWR(`/leaderboard/${userId}`, fetcher);

  return {
    entries: data || [],
    isLoading: !data,
  };
};

export default useLeaderboardEntries;
