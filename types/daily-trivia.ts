import { DailyTriviaQuestion } from "./daily-trivia-questions";

export interface DailyTrivia {
  id: number;
  name: string;
  questions: DailyTriviaQuestion[];
}
