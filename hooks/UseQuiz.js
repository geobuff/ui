import { useEffect, useState } from "react";

const useQuiz = (id) => {
  const [quiz, setQuiz] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/quizzes/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setQuiz(data);
          setIsLoading(false);
        });
    }
  }, [id]);

  useEffect(() => {
    if (quiz.apiPath) {
      setIsLoading(true);
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/mappings/${quiz.apiPath}`)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setIsLoading(false);
        });
    }
  }, [quiz.apiPath]);

  return {
    quiz: quiz,
    isLoading: isLoading,
    data: data,
  };
};

export default useQuiz;
