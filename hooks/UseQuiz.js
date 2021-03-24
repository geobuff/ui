import useSWR from "swr";
import { fetcher } from "../helpers/fetcher";

const useQuiz = (id) => {
  const { data, error } = useSWR(`/quizzes/${id}`, fetcher);

  return {
    quiz: data || [],
    isLoading: !data,
    error: error,
  };
};

export default useQuiz;
