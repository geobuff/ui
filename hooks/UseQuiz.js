import { useEffect, useState } from "react";

const useQuiz = (id) => {
  const [quiz, setQuiz] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/quizzes/${id}`)
      .then((response) => response.json())
      .then((quiz) => {
        setQuiz(quiz);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (quiz.apiPath) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/${quiz.apiPath}`)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        });
    }
  }, [quiz.apiPath]);

  return {
    quiz: quiz,
    loading: loading,
    data: data,
  };
};

export default useQuiz;
