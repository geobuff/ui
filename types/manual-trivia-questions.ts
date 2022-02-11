import { TriviaAnswer } from "./trivia-answer";

export interface ManualTriviaQuestion {
  id: number;
  typeId: number;
  question: string;
  answers: TriviaAnswer[];
  map?: string;
  highlighted?: string;
  flagCode?: string;
  imageUrl?: string;
}
