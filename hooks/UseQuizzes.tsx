import useSWR from "swr";
import { fetcher } from "../helpers/fetcher";
import { Quiz } from "../types/quiz";

interface Result {
  quizzes: Quiz[];
  isLoading: boolean;
}

const useQuizzes = (filter = ""): Result => {
  const { data } = useSWR(`/quizzes?filter=${filter}`, fetcher);

  return {
    quizzes: data || [],
    isLoading: !data,
  };
};

export default useQuizzes;
