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
    data:
      data?.map((mapping) => ({
        ...mapping,
        flagUrl: mapping.flagUrl.Valid ? mapping.flagUrl.String : "",
        alternativeNames: mapping.alternativeNames.map((altName) =>
          altName.toLowerCase()
        ),
        prefixes: mapping.prefixes.map((prefix) => prefix.toLowerCase()),
      })) || [],
    isLoading: !data,
  };
};

export default useMappingEntries;
