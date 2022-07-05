import { TriviaQuestionTypes } from "./trivia-question-types";

export interface GetCommunityQuiz {
  id: number;
  userId: number;
  name: string;
  description: string;
  maxScore: number;
  isPublic: boolean;
  questions: GetCommunityQuizQuestion[];
}

export interface GetCommunityQuizQuestion {
  id: number;
  typeId: number;
  type: TriviaQuestionTypes;
  question: string;
  explainer: string;
  map: string;
  highlighted: string;
  flagCode: string;
  imageUrl: string;
  imageAttributeName: string;
  imageAttributeUrl: string;
  answers: GetCommunityQuizAnswer[];
}

export interface GetCommunityQuizAnswer {
  id: number;
  text: string;
  isCorrect: boolean;
  flagCode: string;
}
