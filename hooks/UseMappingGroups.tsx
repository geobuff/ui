import useSWR from "swr";
import { fetcher } from "../helpers/fetcher";
import { MappingGroup } from "../types/mapping-group";

interface Result {
  data: MappingGroup[];
  isLoading: boolean;
}

const useMappingGroups = (): Result => {
  const { data } = useSWR(`/mappings`, fetcher);

  return {
    data: data ?? [],
    isLoading: !data,
  };
};

export default useMappingGroups;
