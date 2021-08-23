export interface UserLeaderboardEntry {
    id: number;
    userId: number;
    quizId: number;
    badgeGroup: number;
    quizName: string;
    quizImageUrl: string;
    quizMaxScore: number;
    score: number;
    time: number;
    added: Date;
    rank: number;
}