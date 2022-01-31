import { PlaysDto } from "../types/plays-dto";

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
