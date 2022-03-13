import { TriviaQuestion } from "./trivia-question";

export interface Trivia {
  id: number;
  name: string;
  date: string;
  maxScore: number;
  questions?: TriviaQuestion[];
}
