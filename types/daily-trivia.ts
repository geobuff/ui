import { DailyTriviaQuestion } from "./daily-trivia-questions";

export interface DailyTrivia {
  id: number;
  name: string;
  date?: string;
  questions?: DailyTriviaQuestion[];
}
