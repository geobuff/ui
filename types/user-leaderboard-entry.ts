export interface UserLeaderboardEntry {
  id: number;
  userId: number;
  quizId: number;
  badgeId: number;
  quizName: string;
  quizImageUrl: string;
  quizMaxScore: number;
  score: number;
  time: number;
  added: Date;
  rank: number;
}
