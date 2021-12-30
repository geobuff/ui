import useSWR from "swr";
import { fetcher } from "../helpers/fetcher";
import { DailyTriviaQuestion } from "../types/daily-trivia-questions";

interface Result {
  data: DailyTriviaQuestion[];
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
