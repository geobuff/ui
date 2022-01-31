import { PlaysDto } from "../types/plays-dto";
import { TotalUserDto } from "../types/total-users-dto";

export const getQuizPlaysData = (quizPlays: PlaysDto[]): any[] => {
  return quizPlays.map((x) => {
    return {
      name: x.name,
      Plays: x.plays,
    };
  });
};

export const getTriviaPlaysData = (triviaPlays: PlaysDto[]): any[] => {
  return triviaPlays.map((x) => {
    return {
      name: x.name.split(",")[0],
      Plays: x.plays,
    };
  });
};

export const getTotalUsersData = (totalUsers: TotalUserDto[]): any[] => {
  return totalUsers.map((x) => {
    return {
      day: x.day,
      Count: x.count,
    };
  });
};
