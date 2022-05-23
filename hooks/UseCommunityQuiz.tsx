import useSWR from "swr";
import { fetcher } from "../helpers/fetcher";
import { GetCommunityQuiz } from "../types/get-community-quiz-dto";

interface Result {
  data: GetCommunityQuiz;
  isLoading: boolean;
}

const useCommunityQuiz = (id: number): Result => {
  const { data } = useSWR(`/community-quizzes/${id}`, fetcher);

  return {
    data: data || [],
    isLoading: !data,
  };
};

export default useCommunityQuiz;
