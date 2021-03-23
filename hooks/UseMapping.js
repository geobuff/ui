import useSWR from "swr";
import useQuiz from "./UseQuiz";
import { fetcher } from "../helpers/fetcher";

const useMapping = (quizId) => {
  const { quiz } = useQuiz(quizId);

  const shouldFetch = !!quiz && quiz.apiPath;

  const { data } = useSWR(
    () =>
      shouldFetch
        ? `${process.env.NEXT_PUBLIC_API_URL}/mappings/${quiz.apiPath}`
        : null,
    fetcher
  );

  return {
    mapping: data || [],
    isLoading: !data,
  };
};

export default useMapping;
