import useSWR from "swr";
import { fetcher } from "../helpers/fetcher";

const useMerch = () => {
  const { data } = useSWR(`/merch`, fetcher);

  return {
    merch: data ?? [],
    isLoading: !data,
  };
};

export default useMerch;
