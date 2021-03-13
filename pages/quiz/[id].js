import React from "react";
import { useRouter } from "next/router";

import useQuizzes from "../../hooks/UseQuizzes";
import GameMapQuizContainer from "../../containers/GameMapQuizContainer";

const Quiz = () => {
  const { quizzes, loading } = useQuizzes();
  const router = useRouter();
  const { id } = router.query;

  if (loading) {
    return null;
  }

  const filter = quizzes.filter((x) => x.route === id);
  if (filter.length === 0) {
    return null;
  }

  return <GameMapQuizContainer quizId={filter[0].id} />;
};

export default Quiz;
