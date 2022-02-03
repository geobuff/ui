import { Quiz } from "./quiz";

export interface QuizPageDto {
  quizzes: Quiz[];
  hasMore: boolean;
}
