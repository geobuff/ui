import useSWR from "swr";
import { fetcher } from "../helpers/fetcher";

const useQuizzes = (filter = "") => {
  const { data, error } = useSWR(`/quizzes?filter=${filter}`, fetcher);

  return {
    quizzes: data || [],
    isLoading: !data,
    error: error,
  };
};

export default useQuizzes;
