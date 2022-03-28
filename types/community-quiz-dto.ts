import { NullInt } from "./null-int";

export interface CommunityQuiz {
  id: number;
  userId: number;
  username: string;
  name: string;
  description: string;
  maxScore: number;
  added: Date;
  plays: NullInt;
}
