import { NullTime } from "./null-time";
import { TriviaAnswer } from "./trivia-answer";
import { TriviaQuestionTypes } from "./trivia-question-types";

export interface TriviaQuestion {
  id: number;
  typeId: number;
  type: TriviaQuestionTypes;
  question: string;
  map?: string;
  highlighted?: string;
  flagCode?: string;
  imageUrl?: string;
  explainer?: string;
  lastUsed: NullTime;
  answers: TriviaAnswer[];
}
