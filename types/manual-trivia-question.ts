import { ManualTriviaAnswer } from "./manual-trivia-answer";
import { NullTime } from "./null-time";

export interface ManualTriviaQuestion {
  id: number;
  typeId: number;
  type: string;
  categoryId: number;
  category: string;
  imageUrl?: string;
  imageAttributeName?: string;
  imageAttributeUrl?: string;
  flagCode?: string;
  map?: string;
  highlighted?: string;
  lastUsed?: NullTime;
  quizDate?: NullTime;
  question: string;
  explainer?: string;
  lastUpdated: string;
  answers: ManualTriviaAnswer[];
}
