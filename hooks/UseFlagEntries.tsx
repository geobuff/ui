import useSWR from "swr";
import { fetcher } from "../helpers/fetcher";
import { FlagEntry } from "../types/flag-group";

interface Result {
  data: FlagEntry[];
  isLoading: boolean;
}

const useFlagGroup = (key: string): Result => {
  const { data } = useSWR(() => (key ? `/flags/${key}` : null), fetcher);

  return {
    data: data ?? [],
    isLoading: !data,
  };
};

export default useFlagGroup;
