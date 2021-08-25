export interface LeaderboardEntry {
  id: number;
  userId: number;
  username: string;
  countryCode: string;
  score: number;
  time: number;
  added: Date;
  rank: number;
}
