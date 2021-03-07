import { useEffect, useState } from "react";

const useQuiz = (id) => {
  const [quiz, setQuiz] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/quizzes/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setQuiz(data);
        setLoading(false);
      });
  }, []);

  return {
    quiz: quiz,
    loading: loading,
  };
};

export default useQuiz;
