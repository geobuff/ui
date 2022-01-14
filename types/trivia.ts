import { TriviaQuestion } from "./trivia-questions";

export interface Trivia {
  id: number;
  name: string;
  date?: string;
  questions?: TriviaQuestion[];
}
