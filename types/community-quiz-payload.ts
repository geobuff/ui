import { NullInt } from "./null-int";

export interface CommunityQuizPayload {
  userId: number;
  name: string;
  description: string;
  maxScore: number;
  isPublic: boolean;
  isVerified: boolean;
  questions: CommunityQuizQuestionPayload[];
}

export interface CommunityQuizQuestionPayload {
  id: NullInt;
  typeId: number;
  question: string;
  explainer: string;
  imageUrl?: string;
  imageAttributeName?: string;
  imageAttributeUrl?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAlt?: string;
  flagCode?: string;
  map?: string;
  highlighted?: string;
  answers: CommunityQuizAnswerPayload[];
}

interface CommunityQuizAnswerPayload {
  text: string;
  isCorrect: boolean;
  flagCode: string;
}
