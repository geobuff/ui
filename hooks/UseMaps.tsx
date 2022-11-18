import useSWR from "swr";

import { fetcher } from "../helpers/fetcher";
import { GetMapsDto } from "../types/get-maps-dto";

interface Result {
  data: GetMapsDto[];
  isLoading: boolean;
}

const useMaps = (): Result => {
  const { data } = useSWR(`/maps`, fetcher);

  return {
    data: data ?? [],
    isLoading: !data,
  };
};

export default useMaps;
