import { SVGBase } from "@geobuff/buff-ui/components";

import { NullString } from "./null-string";
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
  mapName?: string;
  map?: SVGBase;
  highlighted: string;
  flagCode: string;
  flagUrl?: NullString;
  imageUrl: string;
  imageAttributeName: string;
  imageAttributeUrl: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
  answers: GetCommunityQuizAnswer[];
}

export interface GetCommunityQuizAnswer {
  id: number;
  text: string;
  isCorrect: boolean;
  flagCode: string;
  flagUrl: NullString;
}
