import useSWR from "swr";
import { fetcher } from "../helpers/fetcher";

const useQuizzes = (filter = "") => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const { data, error } = useSWR(
    `${baseUrl}/quizzes?filter=${filter}`,
    fetcher
  );

  return {
    quizzes: data || [],
    isLoading: !data,
    error: error,
  };
};

export default useQuizzes;
