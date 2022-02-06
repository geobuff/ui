import useSWR from "swr";
import { fetcher } from "../helpers/fetcher";
import { Continent } from "../types/continent";

interface Result {
  data: Continent[];
  isLoading: boolean;
}

const useContinents = (): Result => {
  const { data } = useSWR(`/continents`, fetcher);

  return {
    data: data || [],
    isLoading: !data,
  };
};

export default useContinents;
