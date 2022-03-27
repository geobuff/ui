import useSWR from "swr";
import { fetcher } from "../helpers/fetcher";
import { CommunityQuiz } from "../types/community-quiz-dto";

interface Result {
  quizzes: CommunityQuiz[];
  isLoading: boolean;
}

const useUserCommunityQuizzes = (userId: number): Result => {
  const { data } = useSWR(`/community-quizzes/user/${userId}`, fetcher);

  return {
    quizzes: data ?? [],
    isLoading: !data,
  };
};

export default useUserCommunityQuizzes;
