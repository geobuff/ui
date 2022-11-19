import useSWR from "swr";

import { fetcher } from "../helpers/fetcher";
import { Trivia } from "../types/trivia";

interface Result {
  data: Trivia[];
  isLoading: boolean;
}

const useAllTrivia = (): Result => {
  const { data } = useSWR("/trivia", fetcher);

  return {
    data: data ?? [],
    isLoading: !data,
  };
};

export default useAllTrivia;
