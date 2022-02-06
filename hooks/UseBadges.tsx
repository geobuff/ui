import useSWR from "swr";
import { fetcher } from "../helpers/fetcher";
import { Badge } from "../types/badge";

interface Result {
  data: Badge[];
  isLoading: boolean;
}

const useBadges = (): Result => {
  const { data } = useSWR(`/badges`, fetcher);

  return {
    data: data ?? [],
    isLoading: !data,
  };
};

export default useBadges;
