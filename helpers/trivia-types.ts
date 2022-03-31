import { QuestionType } from "../types/manual-trivia-question-form-submit";

export const getType = (typeId: string): string => {
  switch (typeId) {
    case QuestionType.Text:
      return "Text";
    case QuestionType.Image:
      return "Image";
    case QuestionType.Flag:
      return "Flag";
    case QuestionType.Map:
      return "Map";
    default:
      return "Unknown";
  }
};
