import { NullString } from "./null-string";

export interface TriviaAnswer {
  text: string;
  isCorrect: boolean;
  flagCode?: string;
  flagUrl?: NullString;
}
