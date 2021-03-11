import { useEffect, useState } from "react";

const useQuiz = (id) => {
  const [quiz, setQuiz] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/quizzes/${id}`)
      .then((response) => response.json())
      .then((quiz) => {
        setQuiz(quiz);
      });
  }, []);

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
