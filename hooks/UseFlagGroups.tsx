import useSWR from "swr";

import { fetcher } from "../helpers/fetcher";
import { FlagGroup } from "../types/flag-group";

interface Result {
  data: FlagGroup[];
  isLoading: boolean;
}

const useFlagGroups = (): Result => {
  const { data } = useSWR("/flags", fetcher);

  return {
    data: data ?? [],
    isLoading: !data,
  };
};

export default useFlagGroups;
