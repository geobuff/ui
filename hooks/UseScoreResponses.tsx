import { useContext } from "react";

import { LanguageContext } from "../context/LanguageContext/LanguageContext";

import { getRandomCollectionItem } from "../helpers/random";

interface Result {
  getScoreResponse: (score: number, max: number) => string;
}

export const useScoreResponses = (): Result => {
  const { t } = useContext(LanguageContext);

  const getScoreResponse = (score: number, max: number): string => {
    const percent = (100 * score) / max;
    switch (true) {
      case percent >= 80:
        return getRandomCollectionItem(t.scoreResponses.perfect);
      case percent < 80 && percent >= 60:
        return getRandomCollectionItem(t.scoreResponses.good);
      case percent < 60 && percent >= 40:
        return getRandomCollectionItem(t.scoreResponses.okay);
      default:
        return getRandomCollectionItem(t.scoreResponses.poor);
    }
  };

  return {
    getScoreResponse,
  };
};
