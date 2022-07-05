import { ManualTriviaAnswer } from "./manual-trivia-answer";
import { NullTime } from "./null-time";

export interface ManualTriviaQuestionPayload {
  typeId: number;
  categoryId: number;
  question: string;
  map: string;
  highlighted: string;
  flagCode: string;
  imageUrl: string;
  imageAttributeName: string;
  imageAttributeUrl: string;
  explainer: string;
  answers: ManualTriviaAnswer[];
  quizDate: NullTime;
}
