import { ManualTriviaQuestion } from "./manual-trivia-question";

export interface ManualQuestionsDto {
  questions: ManualTriviaQuestion[];
  hasMore: boolean;
}
