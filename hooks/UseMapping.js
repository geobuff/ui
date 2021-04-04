import useSWR from "swr";
import useQuiz from "./UseQuiz";
import { fetcher } from "../helpers/fetcher";

const useMapping = (quizId) => {
  const { quiz } = useQuiz(quizId);

  const shouldFetch = !!quiz && quiz.apiPath;

  const { data } = useSWR(
    () => (shouldFetch ? `/mappings/${quiz.apiPath}` : null),
    fetcher
  );

  return {
    mapping:
      data?.map((mapping) => ({
        ...mapping,
        alternativeNames: mapping.alternativeNames.map((altName) =>
          altName.toLowerCase()
        ),
        prefixes: mapping.prefixes.map((prefix) => prefix.toLowerCase()),
      })) || [],
    isLoading: !data,
  };
};

export default useMapping;
