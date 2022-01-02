import { DailyTriviaAnswer } from "./daily-trivia-answer";
import { DailyTriviaQuestionType } from "./daily-trivia-question-type";

export interface DailyTriviaQuestion {
  id: number;
  type: DailyTriviaQuestionType;
  question: string;
  answers: DailyTriviaAnswer[];
  map?: string;
  highlighted?: string;
  flagCode?: string;
  imageUrl?: string;
}
