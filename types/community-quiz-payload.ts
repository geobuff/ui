import { NullInt } from "./null-int";

export interface CommunityQuizPayload {
  userId: number;
  name: string;
  description: string;
  maxScore: number;
  isPublic: boolean;
  questions: CommunityQuizQuestionPayload[];
}

interface CommunityQuizQuestionPayload {
  id: NullInt;
  typeId: number;
  question: string;
  map: string;
  highlighted: string;
  flagCode: string;
  imageUrl: string;
  imageAttributeName: string;
  imageAttributeUrl: string;
  explainer: string;
  answers: CommunityQuizAnswerPayload[];
}

interface CommunityQuizAnswerPayload {
  text: string;
  isCorrect: boolean;
  flagCode: string;
}
