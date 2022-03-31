export interface CommunityQuizAnswer {
  text: string;
  isCorrect: boolean;
  flagCode: string;
}

export interface CommunityQuizQuestion {
  id?: number;
  typeId: string;
  imageUrl?: string;
  flagCode?: string;
  map?: string;
  highlighted?: string;
  question: string;
  answers: CommunityQuizAnswer[];
}
