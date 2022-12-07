import { useEffect, useState } from "react";

import axiosClient from "../axios";
import { Quiz } from "../types/quiz";

interface Result {
  data: Quiz;
  isLoading: boolean;
}

export const useQuiz = (route: string): Result => {
  const [data, setData] = useState<Quiz>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axiosClient
      .get(`${process.env.NEXT_PUBLIC_API_URL}/quizzes/route/${route}`)
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      });
  }, []);

  return {
    data: data,
    isLoading: isLoading,
  };
};
