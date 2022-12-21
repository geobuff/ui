import { useContext, useEffect, useState } from "react";

import { LanguageContext } from "../contexts";

import axiosClient from "../axios";
import { Trivia } from "../types/trivia";

interface Result {
  data: Trivia[];
  isLoading: boolean;
}

export const useAllTrivia = (limit = 30): Result => {
  const [data, setData] = useState<Trivia[]>();
  const [isLoading, setIsLoading] = useState(true);

  const { language } = useContext(LanguageContext);

  useEffect(() => {
    axiosClient
      .post(`${process.env.NEXT_PUBLIC_API_URL}/trivia/all`, {
        page: 0,
        limit: limit,
      })
      .then((response) => {
        setData(response.data.trivia);
        setIsLoading(false);
      });
  }, [limit, language]);

  return {
    data: data,
    isLoading: isLoading,
  };
};
