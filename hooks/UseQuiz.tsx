import useSWR from "swr";
import { fetcher } from "../helpers/fetcher";
import { Quiz } from "../types/quiz";

interface Result {
  quiz: Quiz;
  isLoading: boolean;
}

const useQuiz = (id: number): Result => {
  const { data } = useSWR(`/quizzes/${id}`, fetcher);

  return {
    quiz: data || [],
    isLoading: !data,
  };
};

export default useQuiz;
