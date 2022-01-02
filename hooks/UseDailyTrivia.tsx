import useSWR from "swr";
import { fetcher } from "../helpers/fetcher";
import { DailyTrivia } from "../types/daily-trivia";

interface Result {
  data: DailyTrivia;
  isLoading: boolean;
}

const useDailyTrivia = (date: string): Result => {
  const { data } = useSWR(`/daily-trivia/${date}`, fetcher);

  return {
    data: data ?? [],
    isLoading: !data,
  };
};

export default useDailyTrivia;
