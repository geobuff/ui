import { TriviaQuestionTypes } from "../types/trivia-question-types";

export const getTriviaQuestionTypeId = (
  type: TriviaQuestionTypes,
  setError: Function
): number => {
  switch (type) {
    case "Text":
      return 1;
    case "Image":
      return 2;
    case "Map":
      return 3;
    case "Flag":
      return 4;
    default:
      setError(`Invalid trivia question type ${type}.`);
  }
};
