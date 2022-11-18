import useSWR from "swr";

import { fetcher } from "../helpers/fetcher";
import { MappingsWithoutFlagsDto } from "../types/mappings-without-flags-dto";

interface Result {
  data: MappingsWithoutFlagsDto[];
  isLoading: boolean;
}

const useMappingsWithoutFlags = (): Result => {
  const { data } = useSWR(`/mappings-no-flags`, fetcher);

  return {
    data: data ?? [],
    isLoading: !data,
  };
};

export default useMappingsWithoutFlags;
