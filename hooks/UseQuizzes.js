import { useEffect, useState } from "react";

const useQuizzes = (filter) => {
  const [quizzes, setQuizzes] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/quizzes?filter=${filter}`)
      .then((response) => response.json())
      .then((data) => {
        setQuizzes(data);
        setLoading(false);
      });
  }, []);

  return {
    quizzes: quizzes,
    loading: loading,
  };
};

export default useQuizzes;
