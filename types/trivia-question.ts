import { NullString } from "./null-string";
import { NullTime } from "./null-time";
import { SVGBase } from "./svg-base";
import { TriviaAnswer } from "./trivia-answer";
import { TriviaQuestionTypes } from "./trivia-question-types";

export interface TriviaQuestion {
  id: number;
  typeId: number;
  type: TriviaQuestionTypes;
  question: string;
  mapName?: string;
  map?: SVGBase;
  highlighted?: string;
  flagCode?: string;
  flagUrl?: NullString;
  imageUrl?: string;
  imageAttributeName?: string;
  imageAttributeUrl?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAlt?: string;
  explainer?: string;
  lastUsed: NullTime;
  answers: TriviaAnswer[];
}
