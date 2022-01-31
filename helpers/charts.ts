import { PlaysDto } from "../types/plays-dto";

export const getQuizPlaysData = (quizPlays: PlaysDto[]): any[] => {
  return quizPlays.map((x) => {
    return {
      name: x.name,
      Plays: x.plays,
    };
  });
};
