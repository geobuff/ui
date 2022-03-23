import { ManualTriviaAnswer } from "./manual-trivia-answer";
import { ManualTriviaQuestionFormSubmit } from "./manual-trivia-question-form-submit";

export interface ManualTriviaQuestionEditValues
  extends ManualTriviaQuestionFormSubmit {
  hasFlagAnswers?: boolean;
  id: string;
  answers?: ManualTriviaAnswer[];
}
