import { TriviaAnswer } from "./trivia-answer";
import { TriviaQuestionType } from "./trivia-question-type";

export interface TriviaQuestion {
  id: number;
  type: TriviaQuestionType;
  question: string;
  answers: TriviaAnswer[];
  map?: string;
  highlighted?: string;
  flagCode?: string;
  imageUrl?: string;
}
