import useSWR from "swr";
import { fetcher } from "../helpers/fetcher";

const usePlays = () => {
  const { data, error } = useSWR("/plays", fetcher);

  return {
    plays: data,
    isLoading: !data,
    error: error,
  };
};

export default usePlays;
