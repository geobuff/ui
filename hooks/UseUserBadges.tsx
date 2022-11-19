import useSWR from "swr";

import { fetcher } from "../helpers/fetcher";
import { Badge } from "../types/badge";

interface Result {
  badges: Badge[];
  isLoading: boolean;
}

const useUserBadges = (userId: number): Result => {
  const { data } = useSWR(`/badges/${userId}`, fetcher);

  return {
    badges: data ?? [],
    isLoading: !data,
  };
};

export default useUserBadges;
