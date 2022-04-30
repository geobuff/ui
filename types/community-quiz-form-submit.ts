export interface CommunityQuizFormSubmit {
  name: string;
  description: string;
  questions: CommunityQuizFormQuestion[];
}

export interface CommunityQuizFormQuestion {
  id?: number;
  typeId: string;
  question: string;
  map: string;
  highlighted: string;
  flagCode: string;
  imageUrl: string;
  answers: CommunityQuizFormAnswer[];
  correctAnswer: string | number;
}

interface CommunityQuizFormAnswer {
  text: string;
  isCorrect: boolean;
  flagCode: string;
}
