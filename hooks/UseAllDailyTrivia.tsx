import useSWR from "swr";
import { fetcher } from "../helpers/fetcher";
import { DailyTrivia } from "../types/daily-trivia";

interface Result {
  data: DailyTrivia[];
  isLoading: boolean;
}

const useAllDailyTrivia = (): Result => {
  const { data } = useSWR("/daily-trivia", fetcher);

  return {
    data: data ?? [],
    isLoading: !data,
  };
};

export default useAllDailyTrivia;
