export interface CreateManualTriviaQuestionFormSubmit {
  typeId: string;
  question: string;
  quizDate: string;
  map: string;
  highlighted: string;
  flagCode: string;
  imageUrl: string;
  answerOneText: string;
  answerOneFlagCode: string;
  answerTwoText: string;
  answerTwoFlagCode: string;
  answerThreeText: string;
  answerThreeFlagCode: string;
  answerFourText: string;
  answerFourFlagCode: string;
  correctAnswer: number;
}

export enum QuestionType {
  Text = "1",
  Image = "2",
  Flag = "3",
  Map = "4",
}
