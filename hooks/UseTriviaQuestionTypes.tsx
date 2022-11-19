import useSWR from "swr";

import { fetcher } from "../helpers/fetcher";
import { TriviaQuestionType } from "../types/trivia-question-type";

interface Result {
  data: TriviaQuestionType[];
  isLoading: boolean;
}

const useTriviaQuestionTypes = (): Result => {
  const { data } = useSWR("/trivia-question-types", fetcher);

  return {
    data: data || [],
    isLoading: !data,
  };
};

export default useTriviaQuestionTypes;
