import useSWR from "swr";
import { fetcher } from "../helpers/fetcher";
import { Badge } from "../types/badge";

interface Result {
  badges: Badge[];
  isLoading: boolean;
}

const useBadges = (): Result => {
  const { data } = useSWR(`/badges`, fetcher);

  return {
    badges: data ?? [],
    isLoading: !data,
  };
};

export default useBadges;
