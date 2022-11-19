import useSWR from "swr";

import { fetcher } from "../helpers/fetcher";
import { TriviaQuestionCategory } from "../types/trivia-question-category";

interface Result {
  data: TriviaQuestionCategory[];
  isLoading: boolean;
}

const useTriviaQuestionCategories = (): Result => {
  const { data } = useSWR("/trivia-question-categories", fetcher);

  return {
    data: data?.filter((x) => x.isActive) || [],
    isLoading: !data,
  };
};

export default useTriviaQuestionCategories;
