export interface ManualTriviaAnswer {
  id: number;
  manualTriviaQuestionId: number;
  text: string;
  isCorrect: boolean;
  flagCode: string;
}
