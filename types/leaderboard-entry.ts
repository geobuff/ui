export interface LeaderboardEntry {
  id: number;
  userId: number;
  username: string;
  countryCode: string;
  score: number;
  time: Date;
  added: Date;
  rank: number;
}
