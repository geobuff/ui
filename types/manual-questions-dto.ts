import { ManualTriviaQuestion } from "./manual-trivia-questions";

export interface ManualQuestionsDto {
  questions: ManualTriviaQuestion[];
  hasMore: boolean;
}
