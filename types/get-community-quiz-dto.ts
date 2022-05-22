import { TriviaQuestionType } from "./trivia-question-types";

export interface GetCommunityQuiz {
  id: number;
  userId: number;
  name: string;
  description: string;
  maxScore: number;
  questions: GetCommunityQuizQuestion[];
}

export interface GetCommunityQuizQuestion {
  id: number;
  typeId: number;
  type: TriviaQuestionType;
  question: string;
  explainer: string;
  map: string;
  highlighted: string;
  flagCode: string;
  imageUrl: string;
  answers: GetCommunityQuizAnswer[];
}

export interface GetCommunityQuizAnswer {
  id: number;
  text: string;
  isCorrect: boolean;
  flagCode: string;
}