import { CommunityQuiz } from "./community-quiz-dto";
import { Quiz } from "./quiz";
import { Trivia } from "./trivia";

export interface QuizSearchResults {
  quizzes: Quiz[];
  communityQuizzes: CommunityQuiz[];
  trivia: Trivia[];
  length: number;
}
