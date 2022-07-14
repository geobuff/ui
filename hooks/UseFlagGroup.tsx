import useSWR from "swr";
import { fetcher } from "../helpers/fetcher";
import { FlagGroup } from "../types/flag-group";

interface Result {
  data: FlagGroup;
  isLoading: boolean;
}

const useFlagGroup = (key: string): Result => {
  const { data } = useSWR(`/flags/${key}`, fetcher);

  return {
    data: data,
    isLoading: !data,
  };
};

export default useFlagGroup;
