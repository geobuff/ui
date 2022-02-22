export interface CreateManualTriviaQuestionFormSubmit {
  typeId: string;
  question: string;
  map: string;
  highlighted: string;
  flagCode: string;
  imageUrl: string;
  answerOneText: string;
  answerOneIsCorrect: string;
  answerOneFlagCode: string;
  answerTwoText: string;
  answerTwoIsCorrect: string;
  answerTwoFlagCode: string;
  answerThreeText: string;
  answerThreeIsCorrect: string;
  answerThreeFlagCode: string;
  answerFourText: string;
  answerFourIsCorrect: string;
  answerFourFlagCode: string;
  correctAnswer: number;
}

export enum QuestionType {
  Text = 1,
  Image = 2,
  Flag = 3,
  Map = 4,
}
