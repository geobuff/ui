import { ManualTriviaAnswer } from "./manual-trivia-answer";

export interface ManualTriviaQuestion {
  id: number;
  type: string;
  question: string;
  answers: ManualTriviaAnswer[];
}
