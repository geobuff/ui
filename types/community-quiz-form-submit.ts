export interface CommunityQuizFormSubmit {
  name: string;
  description: string;
  isPublic: string;
  questions: CommunityQuizFormQuestion[];
}

export interface CommunityQuizFormQuestion {
  id?: number;
  index?: number;
  typeId: string;
  question: string;
  map: string;
  highlighted: string;
  flagCode: string;
  imageUrl: string;
  explainer: string;
  answers: CommunityQuizFormAnswer[];
  correctAnswer: string | number;
}

interface CommunityQuizFormAnswer {
  text: string;
  isCorrect: boolean;
  flagCode: string;
}
