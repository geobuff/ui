import { useContext, useEffect, useState } from "react";

import { LanguageContext } from "../contexts";

import axiosClient from "../axios";
import { Quiz } from "../types/quiz";

interface Result {
  data: Quiz[];
  isLoading: boolean;
}

export const useAllQuizzes = (type: "map" | "flag"): Result => {
  const [data, setData] = useState<Quiz[]>();
  const [isLoading, setIsLoading] = useState(true);

  const { language } = useContext(LanguageContext);

  useEffect(() => {
    axiosClient
      .post(`${process.env.NEXT_PUBLIC_API_URL}/quizzes/all`, {
        page: 0,
        limit: 150,
        filter: type,
      })
      .then((response) => {
        setData(response.data.quizzes);
        setIsLoading(false);
      });
  }, [type, language]);

  return {
    data: data,
    isLoading: isLoading,
  };
};
