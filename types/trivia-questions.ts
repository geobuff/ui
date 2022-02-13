import { TriviaAnswer } from "./trivia-answer";
import { TriviaQuestionTypes } from "./trivia-question-types";

export interface TriviaQuestion {
  id: number;
  type: TriviaQuestionTypes;
  question: string;
  answers: TriviaAnswer[];
  map?: string;
  highlighted?: string;
  flagCode?: string;
  imageUrl?: string;
}
