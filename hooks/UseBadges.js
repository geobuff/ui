import useSWR from "swr";
import { fetcher } from "../helpers/fetcher";

const useBadges = () => {
  const { data } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/badges`, fetcher);

  return {
    badges: data ?? [],
    loading: !data,
  };
};

export default useBadges;
