import useSWR from "swr";

import { fetcher } from "../helpers/fetcher";
import { MappingEntry } from "../types/mapping-entry";

interface Result {
  data: MappingEntry[];
  isLoading: boolean;
}

const useMappingEntries = (key: string): Result => {
  const { data } = useSWR(() => (key ? `/mappings/${key}` : null), fetcher);

  return {
    data: data,
    isLoading: !data,
  };
};

export default useMappingEntries;
