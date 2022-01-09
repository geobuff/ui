import { Discount } from "./discount";

interface PlaysDto {
  name: string;
  plays: number;
}

export interface AdminDashboardData {
  userCount: number;
  discounts: Discount[];
  quizPlays: PlaysDto[];
  triviaPlays: PlaysDto[];
}
