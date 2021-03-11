import useSWR from "swr";
import useQuiz from "./UseQuiz";
import { fetcher } from "../helpers/fetcher";

const useMapping = (quizId) => {
  const { quiz } = useQuiz(quizId);
  const { data } = useSWR(
    () => `${process.env.NEXT_PUBLIC_API_URL}/mappings/${quiz.apiPath}`,
    fetcher
  );

  return {
    data: data ?? [],
    loading: !data,
  };
};

export default useMapping;
