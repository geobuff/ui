import useSWR from "swr";
import { fetcher } from "../helpers/fetcher";

const useQuiz = (id) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const { data, error } = useSWR(`${baseUrl}/quizzes/${id}`, fetcher);

  return {
    quiz: data || [],
    isLoading: !data,
    error: error,
  };
};

export default useQuiz;
