import { NullInt } from "./null-int";

export interface CommunityQuizPayload {
  userId: number;
  name: string;
  description: string;
  maxScore: number;
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
  answers: CommunityQuizAnswerPayload[];
}

interface CommunityQuizAnswerPayload {
  text: string;
  isCorrect: boolean;
  flagCode: string;
}
