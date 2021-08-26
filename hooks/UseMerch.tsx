import useSWR from "swr";
import { fetcher } from "../helpers/fetcher";
import { MerchItem } from "../types/merch-item";

interface Result {
  merch: Array<MerchItem>;
  isLoading: boolean;
}

const useMerch = (): Result => {
  const { data } = useSWR(`/merch`, fetcher);

  return {
    merch: data ?? [],
    isLoading: !data,
  };
};

export default useMerch;
