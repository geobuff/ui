import { useEffect, useState } from "react";

import axiosClient from "../axios";
import { Trivia } from "../types/trivia";

interface Result {
  data: Trivia[];
  isLoading: boolean;
}

export const useAllTrivia = (limit = 30): Result => {
  const [data, setData] = useState<Trivia[]>();
  const [isLoading, setIsLoading] = useState(true);

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
  }, [limit]);

  return {
    data: data,
    isLoading: isLoading,
  };
};
