import useSWR from "swr";
import { fetcher } from "../helpers/fetcher";
import { MappingEntry } from "../types/mapping-entry";

interface Result {
  data: MappingEntry[];
  isLoading: boolean;
}

const useMappingEntries = (key: string): Result => {
  const { data } = useSWR(`/mappings/${key}`, fetcher);

  return {
    data:
      data?.map((mapping) => ({
        ...mapping,
        alternativeNames: mapping.alternativeNames.map((altName) =>
          altName.toLowerCase()
        ),
        prefixes: mapping.prefixes.map((prefix) => prefix.toLowerCase()),
      })) || [],
    isLoading: !data,
  };
};

export default useMappingEntries;
