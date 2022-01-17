import useSWR from "swr";
import { fetcher } from "../helpers/fetcher";
import { Trivia } from "../types/trivia";

interface Result {
  data: Trivia;
  isLoading: boolean;
}

const useTrivia = (date: string): Result => {
  const { data } = useSWR(`/trivia/${date}`, fetcher);

  return {
    data: data,
    isLoading: !data,
  };
};

export default useTrivia;
