import useSWR from "swr";

import { fetcher } from "../helpers/fetcher";
import { QuizType } from "../types/quiz-type";

interface Result {
  data: QuizType[];
  isLoading: boolean;
}

const useQuizTypes = (): Result => {
  const { data } = useSWR(`/quiztype`, fetcher);

  return {
    data: data || [],
    isLoading: !data,
  };
};

export default useQuizTypes;
