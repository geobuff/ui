import useSWR from "swr";
import { fetcher } from "../helpers/fetcher";

const useBadges = () => {
  const { data } = useSWR(`/badges`, fetcher);

  return {
    badges: data ?? [],
    loading: !data,
  };
};

export default useBadges;
