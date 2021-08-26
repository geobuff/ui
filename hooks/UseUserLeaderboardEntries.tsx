import useSWR from "swr";
import { fetcher } from "../helpers/fetcher";
import { UserLeaderboardEntry } from "../types/user-leaderboard-entry";

interface Result {
  entries: UserLeaderboardEntry[];
  isLoading: boolean;
}

const useUserLeaderboardEntries = (userId: number): Result => {
  const { data } = useSWR(`/leaderboard/${userId}`, fetcher);

  return {
    entries: data || [],
    isLoading: !data,
  };
};

export default useUserLeaderboardEntries;
