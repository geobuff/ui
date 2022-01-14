import useSWR from "swr";
import { fetcher } from "../helpers/fetcher";

interface Result {
  plays: number;
  isLoading: boolean;
}

const useAllPlays = (): Result => {
  const { data } = useSWR("/quiz-plays", fetcher);

  return {
    plays: data,
    isLoading: !data,
  };
};

export default useAllPlays;
