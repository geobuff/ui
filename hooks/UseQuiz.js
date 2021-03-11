import { useEffect, useState } from "react";

const useQuiz = (id) => {
  const [quiz, setQuiz] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/quizzes/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setQuiz(data);
          setLoading(false);
        });
    }
  }, [id]);

  return {
    quiz: quiz,
    loading: loading,
  };
};

export default useQuiz;
