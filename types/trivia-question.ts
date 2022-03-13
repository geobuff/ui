import { NullTime } from "./null-time";
import { TriviaAnswer } from "./trivia-answer";
import { TriviaQuestionType } from "./trivia-question-types";

export interface TriviaQuestion {
  id: number;
  typeId: number;
  type: TriviaQuestionType;
  question: string;
  map?: string;
  highlighted?: string;
  flagCode?: string;
  imageUrl?: string;
  lastUsed: NullTime;
  answers: TriviaAnswer[];
}
