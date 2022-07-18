import { ManualTriviaAnswer } from "./manual-trivia-answer";
import { NullTime } from "./null-time";

export interface ManualTriviaQuestionPayload {
  typeId: number;
  categoryId: number;
  question: string;
  imageUrl?: string;
  imageAttributeName?: string;
  imageAttributeUrl?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAlt?: string;
  flagCode?: string;
  map?: string;
  highlighted?: string;
  explainer: string;
  answers: ManualTriviaAnswer[];
  quizDate: NullTime;
}
